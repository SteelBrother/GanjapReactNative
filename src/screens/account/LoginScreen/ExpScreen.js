// ExpScreen.js
import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils/screenName";

const ExpScreen = () => {
  const navigation = useNavigation();

  const handleComplete = () => {
    navigation.navigate("Tabs"); // Navega a TabsNavigator
  };

  return (
    <View>
      <Text>Experiencia</Text>
      {/* Aquí va tu lógica de experiencia */}
      <Button title="Finalizar" onPress={handleComplete} />
    </View>
  );
};

export default ExpScreen;
