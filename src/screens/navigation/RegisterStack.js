import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import FeedScreen from "../FeedScreen";
// import { RegisterScreen } from "../../components/Auth/RegisterForm/RegisterForm";
import  RegisterScreen  from "../account/RegisterScreen/RegisterScreen"
// src\screens\account\RegisterScreen\RegisterScreen.js
import { screen } from "../../utils/screenName";
import Terminos from "../account/LoginScreen/Terminos";
import PrivacyPolicies from "../../screens/account/LoginScreen/PrivacyPolicy"
const Stack = createNativeStackNavigator();

export default function RegisterStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Auth.registerstack}
            component={RegisterScreen}
            options={{ title: "Registro" }}
          />
          <Stack.Screen
            name={"Terminos"}
            component={Terminos}
            options={{ title: "Terminos de uso" }}
          />
          <Stack.Screen
            name={"Politicas"}
            component={PrivacyPolicies}
            options={{ title: "Politica de privacidad" }}
          />
        </Stack.Navigator>
      );
}