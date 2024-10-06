// AppNavigation.js
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AgeValidationScreen from "../account/LoginScreen/AgeValidationScreen";
import ExpScreen from "../account/LoginScreen/ExpScreen";
// Importa tus pantallas
import LoginScreen from "../account/LoginScreen/LoginScreen"; // Pantalla de login
import { RegisterScreen } from "../account/RegisterScreen/RegisterScreen";
import HomeStack from "./HomeStack";                // Flujo de tu app normal
import PlantsStack from "./PlantsStack";
import EnvironmentsStack from "./EnvironmentsStack";
import GalleryStack from "./GalleryStack";
import FeedStack from "./FeedStack";
import ConfigStack from "./ConfigStack";
import { screen } from "../../utils/screenName";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente que representa la navegación de tabs
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.Home.tab}
        component={HomeStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name={screen.Plants.tab}
        component={PlantsStack}
        options={{ title: "Plantas" }}
      />
      <Tab.Screen
        name={screen.Environment.tab}
        component={EnvironmentsStack}
        options={{ title: "Ambientes" }}
      />
      <Tab.Screen
        name={screen.Gallery.tab}
        component={GalleryStack}
        options={{ title: "Fotos" }}
      />
      <Tab.Screen
        name={screen.Feed.tab}
        component={FeedStack}
        options={{ title: "Comunidad" }}
      />
      <Tab.Screen
        name={screen.Config.tab}
        component={FeedStack}
        options={{ title: "Config" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  switch (route.name) {
    case screen.Home.tab:
      iconName = "home-outline";
      break;
    case screen.Environment.tab:
      iconName = "earth";
      break;
    case screen.Plants.tab:
      iconName = "sprout";
      break;
    case screen.Gallery.tab:
      iconName = "image-outline";
      break;
    case screen.Feed.tab:
      iconName = "account-group-outline";
      break;
    case screen.Config.tab:
      iconName = "cog-outline";
      break;
  }

  return <Icon type="material-community" name={iconName} color={color} size={size} />;
}

// Componente principal que maneja la navegación entre login y tabs
export const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manejo de autenticación

  return (
<Stack.Navigator>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen
            name={screen.Auth.register}
            component={RegisterScreen}
            options={{ title: "Registro" }} // Agrega opciones si es necesario
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={screen.AgeVal.tab}
            component={AgeValidationScreen}
            options={{ title: "Validación de Edad" }} // Agrega opciones si es necesario
          />
          <Stack.Screen
            name={screen.ExpStack.tab}
            component={ExpScreen}
            options={{ title: "Experiencia" }} // Agrega opciones si es necesario
          />
          <Stack.Screen
            name="Tabs"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
