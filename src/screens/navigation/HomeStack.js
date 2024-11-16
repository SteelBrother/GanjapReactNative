import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import HomeScreen from '../HomeScreen';
import { screen } from "../../utils/screenName";
import ActionCaptureScreen from "../ActionCaptureScreen";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Home.tabStack}
            component={HomeScreen}
            options={{ title: "Inicio" }}
          />
          <Stack.Screen
            name={"ActionCapture"}
            component={ActionCaptureScreen}
            options={{ title: "Acción" }}
          />
        </Stack.Navigator>
      );
}