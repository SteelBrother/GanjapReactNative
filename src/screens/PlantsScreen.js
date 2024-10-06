import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { screen } from "../utils/screenName";
export default function PlantsScreen() {
  const navigation = useNavigation();
  const goToAddPlants = () => 
    {
      navigation.navigate(screen.Plants.addPlant)
    }
  return (
    <View>
      <Text>PlantsScreen</Text>
      <Button title='Añadir planta' onPress={goToAddPlants}></Button>
    </View>
  )
}