// src/screens/stacks/EnvironmentsStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from 'react';
import { firestore } from '../../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import EnvironmentsScreen from "../EnvironmentsScreen";
import EnvironmentList from "../EnvironmentList";
import { ActivityIndicator, View } from 'react-native';
import EditEnvironmentScreen from "../EditEnvironmentScreen";
import AddEnvironmentLogScreen from "../AddEnvironmentLogScreen";

const Stack = createNativeStackNavigator();

export default function EnvironmentsStack() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const environmentsRef = collection(firestore, 'environments');
        const q = query(environmentsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Si hay ambientes guardados, muestra la lista de ambientes
          setInitialRoute('EnvironmentList');
        } else {
          // Si no hay ambientes guardados, muestra la pantalla de creación de ambientes
          setInitialRoute('EnvironmentsScreen');
        }
      } else {
        // Si no hay usuario autenticado, envía al usuario a crear un ambiente
        setInitialRoute('EnvironmentsScreen');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#A3D77F" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="EnvironmentsScreen"
        component={EnvironmentsScreen}
        options={{ title: "Ambientes" }}
      />
      <Stack.Screen
        name="EnvironmentList"
        component={EnvironmentList}
        options={{ title: "Lista de Ambientes" }}
      />
       <Stack.Screen
        name="EditEnvironment"
        component={EditEnvironmentScreen}
        options={{ title: "Lista de Ambientes" }}
      />
      <Stack.Screen
        name="AddEnvironmentLog"
        component={AddEnvironmentLogScreen}
        options={{ title: "Agregar log" }}
      />
    </Stack.Navigator>
  );
}
