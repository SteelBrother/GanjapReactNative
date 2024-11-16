import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import PlantsScreen from "../PlantsScreen";
import { screen } from "../../utils/screenName";
import AddPlantsScreen from "../plants/AddPlantsScreen";
import PlantCreationScreen from "../PlantCreationScreen";
import SelectEnvironmentScreen from "../SelectEnvironmentScreen";
import PlantDetailScreen from "../PlantDetailScreen";
const Stack = createNativeStackNavigator();

export default function PlantsStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name={screen.Plants.plantas}
            component={PlantsScreen}
            options={{ title: "Plantas" }}
          />
           <Stack.Screen
            name={"PlantCreationScreen"}
            component={PlantCreationScreen}
            options={{ title: "Nueva planta" }}
          />
          <Stack.Screen
            name={"SelectEnvironmentScreen"}
            component={SelectEnvironmentScreen}
            options={{ title: "Relaciona un ambiente" }}
          />
          <Stack.Screen
            name={"PlantDetailScreen"}
            component={PlantDetailScreen}
            options={{ title: "Detalles de la Planta" }}
          />
        </Stack.Navigator>
      );
}