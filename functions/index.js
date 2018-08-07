const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const sharp = require("sharp");

const gcconfig = {
  projectId: "awesome-places-d26cb",
  keyFilename: "awesome-places.json"
};
const gcs = require("@google-cloud/storage")(gcconfig);

admin.initializeApp({
  credential: admin.credential.cert(require("./awesome-places.json"))
});

exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("No token present!");
      response.status(403).json({ error: "Unauthorized" });
      return;
    }
    let idToken;
    idToken = request.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(request.body);
        // resize image
        const photoBufferConvertedFromBase64 = Buffer.from(
          body.image.toString(),
          "base64"
        );
        return sharp(photoBufferConvertedFromBase64)
          .resize(300, 300)
          .max()
          .toFormat("jpeg")
          .toFile("/tmp/uploaded-image.jpg")
          .then(info => {
            console.log("Info object: ", info);
            const bucket = gcs.bucket("awesome-places-d26cb.appspot.com");
            const uuid = UUID();

            return bucket.upload(
              "/tmp/uploaded-image.jpg",
              {
                uploadType: "media",
                destination: "/places/" + uuid + ".json",
                metadata: {
                  metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                  }
                }
              },
              (err, file) => {
                if (!err) {
                  return response.status(201).json({
                    imageUrl:
                      "https://firebasestorage.googleapis.com/v0/b/" +
                      bucket.name +
                      "/o/" +
                      encodeURIComponent(file.name) +
                      "?alt=media&token=" +
                      uuid
                  });
                } else {
                  console.log("Error in bucket upload: ", err);
                  return response.status(500).json({ error: err });
                }
              }
            );
          });
      })
      .catch(err => {
        console.log("Token is invalid, ", err);
        return response.status(403).json({ error: "Unauthorized: " + err });
      });
  });
});
