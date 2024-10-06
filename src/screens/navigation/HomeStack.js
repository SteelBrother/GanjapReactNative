import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import HomeScreen from '../HomeScreen';
import { screen } from "../../utils/screenName";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Home.tabStack}
            component={HomeScreen}
            options={{ title: "Inicio" }}
          />
        </Stack.Navigator>
      );
}