import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import FeedScreen from "../FeedScreen";
import { screen } from "../../utils/screenName";
const Stack = createNativeStackNavigator();

export default function FeedStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Feed.tabStack}
            component={FeedScreen}
            options={{ title: "Feed" }}
          />
        </Stack.Navigator>
      );
}