import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import { screen } from "../../utils/screenName";
const Stack = createNativeStackNavigator();
import ConfigScreen from "../ConfigScreen"; 

export default function ConfigStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Environment.environment}
            component={ConfigScreen}
            options={{ title: "Ambientes" }}
          />
        </Stack.Navigator>
      );
}