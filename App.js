import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
// import { AppNavigation } from "../src/screens/navigation/AppNavigation";
import { AppNavigation } from "./src/screens/navigation/AppNavigation"
import { initFirebase } from "./src/utils";
// import "react-native-get-random-values";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>

      {/* <Toast /> */}
    </>
  );
}
