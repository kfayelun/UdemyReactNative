import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";

// register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);

// start App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});
