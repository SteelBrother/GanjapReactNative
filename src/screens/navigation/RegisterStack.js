import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import FeedScreen from "../FeedScreen";
// import { RegisterScreen } from "../../components/Auth/RegisterForm/RegisterForm";
import  RegisterScreen  from "../account/RegisterScreen/RegisterScreen"
// src\screens\account\RegisterScreen\RegisterScreen.js
import { screen } from "../../utils/screenName";
const Stack = createNativeStackNavigator();

export default function RegisterStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Auth.registerstack}
            component={RegisterScreen}
            options={{ title: "Registro" }}
          />
        </Stack.Navigator>
      );
}