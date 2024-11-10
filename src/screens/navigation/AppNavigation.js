import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AgeValidationScreen from "../account/LoginScreen/AgeValidationScreen";
import ExpScreen from "../account/LoginScreen/ExpScreen";
import LoginScreen from "../account/LoginScreen/LoginScreen";
import RegisterStack from "./RegisterStack";
import HomeStack from "./HomeStack";
import PlantsStack from "./PlantsStack";
import EnvironmentsStack from "./EnvironmentsStack";
import GalleryStack from "./GalleryStack";
import FeedStack from "./FeedStack";
import ConfigStack from "./ConfigStack";
import { screen } from "../../utils/screenName";
import LiveStack from "./LiveStack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Screen name={screen.Home.tabpro} component={HomeStack} options={{ title: "Inicio" }} />
      <Tab.Screen name={screen.Live.tab} component={LiveStack} options={{ title: "En vivo" }} />
      <Tab.Screen name={screen.Feed.tab} component={FeedStack} options={{ title: "Comunidad" }} />
      <Tab.Screen name={screen.Config.tab} component={ConfigStack} options={{ title: "Configuración" }} />
    </Tab.Navigator>
  );
}

function TabsNavigatorNoPro() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen name={screen.Home.tab} component={HomeStack} options={{ title: "Inicio" }} />
      <Tab.Screen name={screen.Plants.tab} component={PlantsStack} options={{ title: "Plantas" }} />
      <Tab.Screen name={screen.Environment.tab} component={EnvironmentsStack} options={{ title: "Ambientes" }} />
      <Tab.Screen name={screen.Feed.tab} component={FeedStack} options={{ title: "Comunidad" }} />
      <Tab.Screen name={screen.Config.tab} component={ConfigStack} options={{ title: "Configuración" }} />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;
  switch (route.name) {
    case screen.Home.tab:
      iconName = "home-outline";
      break;
    case screen.Home.tabpro:
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
    default:
      iconName = "circle";
      break;
  }
  return <Icon type="material-community" name={iconName} color={color} size={size} />;
}

export const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserType = async () => {
      if (auth.currentUser) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            setUserType(userDoc.data().userType);
          } else {
            console.log("No se encontraron datos para el usuario actual.");
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      }
      setLoading(false);
    };

    if (isLoggedIn) {
      fetchUserType();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00a680" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen
            name={screen.Auth.register}
            options={{ title: "Registro", headerShown: false }}
          >
            {props => <RegisterStack {...props} onRegister={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen
            name="AgeValidation"
            component={AgeValidationScreen}
            options={{ title: "Validación de Edad" }}
          />
          <Stack.Screen name={screen.ExpStack.tab}>
            {props => <ExpScreen {...props} onSetLoggedIn={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen
          name="MainTabs"
          component={userType === "pro" ? TabsNavigator : TabsNavigatorNoPro}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
