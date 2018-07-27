const Ionicons = require("react-native-vector-icons/Ionicons");

const icons = {
  "ios-add": [Ionicons, 30, "#FFFFFF"],
  "ios-navigate-outline": [Ionicons, 30, "#FFFFFF"]
};

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
  new Promise.all(
    Object.keys(icons).map(iconName =>
      icons[iconName][0].getImageSource(
        iconName,
        icons[iconName][1],
        icons[iconName][2]
      )
    )
  ).then(sources => {
    console.log("Icons, sources: ", icons, sources);
    Object.keys(icons).forEach(
      (iconName, idx) => (iconsMap[iconName] = sources[idx])
    );
    resolve(true);
  });
});

export { iconsMap, iconsLoaded };
