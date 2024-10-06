import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import PlantsScreen from "../PlantsScreen";
import { screen } from "../../utils/screenName";
import AddPlantsScreen from "../plants/AddPlantsScreen";
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
            name={screen.Plants.addPlant}
            component={AddPlantsScreen}
            options={{ title: "Nueva planta" }}
          />
        </Stack.Navigator>
      );
}