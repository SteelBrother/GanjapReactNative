import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native'
import React from 'react'
import { screen } from "../../utils/screenName";
import LiveScreen from "../LiveScreen"
import HomeScreen from "../HomeScreen";
const Stack = createNativeStackNavigator();

export default function LiveStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Live.live}
            component={LiveScreen}
            options={{ title: "En vivo" }}
          />
        </Stack.Navigator>
      );
}