import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";
import { iconsMap, iconsLoaded } from "./helpers/appIcons";

// register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);

// start App - differs from v1!
Navigation.events().registerAppLaunchedListener(() => {
  iconsLoaded.then(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: "awesome-places.AuthScreen"
              }
            }
          ],
          options: {
            topBar: {
              title: {
                text: "Login",
              }
            }
          }
        }
      }
    });
  });
});
