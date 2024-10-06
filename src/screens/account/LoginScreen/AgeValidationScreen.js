// AgeValidationScreen.js
import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

const AgeValidationScreen = () => {
  const navigation = useNavigation();

  const handleValidation = () => {
    // Lógica para validar la edad...
    navigation.navigate(screen.ExpStack.tab); // Navega a ExpScreen
  };

  return (
    <View>
      <Text>Validación de Edad</Text>
      {/* Aquí va tu lógica de validación */}
      <Button title="Continuar" onPress={handleValidation} />
    </View>
  );
};

export default AgeValidationScreen;
