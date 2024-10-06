import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native'
import React from 'react'
import { screen } from "../../utils/screenName";
const Stack = createNativeStackNavigator();
import EnvironmentsScreen from "../EnvironmentsScreen"; 

export default function EnvironmentsStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Environment.environment}
            component={EnvironmentsScreen}
            options={{ title: "Ambientes" }}
          />
        </Stack.Navigator>
      );
}