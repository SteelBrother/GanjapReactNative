import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import GalleryScreen from "../GalleryScreen";
import { screen } from "../../utils/screenName";
const Stack = createNativeStackNavigator();

export default function GalleryStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Gallery.tabStack}
            component={GalleryScreen}
            options={{ title: "Fotos" }}
          />
        </Stack.Navigator>
      );
}