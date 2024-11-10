// AgeValidationScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

const AgeValidationScreen = () => {
  const navigation = useNavigation();

  const handleAccept = () => {
    // Lógica para validar la edad...
    navigation.navigate(screen.ExpStack.tab); // Navega a ExpScreen
  };

  const handleReject = () => {
    // Lógica para rechazar
    // Podrías cerrar la app o regresar a una pantalla anterior
  };

  return (
    <ImageBackground 
      source={require("../../../../assets/icon.png")} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.logoText}>Cultiva con GanjApp</Text>
        <Text style={styles.questionText}>¿Tienes 18 años o más?</Text>
        <Text style={styles.descriptionText}>
          GanjApp requiere que cumpla con los requisitos legales de edad de su zona para ver información sobre cannabis a través de la aplicación.
        </Text>
        <Text style={styles.confirmText}>
          Confirmo que tengo 18 años o más y que estoy de acuerdo con los{" "}
          <Text style={styles.linkText} onPress={() => Linking.openURL("https://www.example.com/terms")}>
            Términos de uso
          </Text>{" "}
          y la{" "}
          <Text style={styles.linkText} onPress={() => Linking.openURL("https://www.example.com/privacy")}>
            Política de privacidad
          </Text>.
        </Text>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>ACEPTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.rejectButtonText}>RECHAZAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logoText: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 20,
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
  },
  linkText: {
    color: "#ADD8E6",
    textDecorationLine: "underline",
  },
  acceptButton: {
    backgroundColor: "#00CC66",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  rejectButton: {
    backgroundColor: "transparent",
  },
  rejectButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default AgeValidationScreen;
