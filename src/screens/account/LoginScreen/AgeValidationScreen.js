// AgeValidationScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

const { width, height } = Dimensions.get("window");

const AgeValidationScreen = () => {
  const navigation = useNavigation();

  const handleAccept = () => {
    navigation.navigate(screen.ExpStack.tab);
  };

  const handleReject = () => {
    // Lógica para rechazar
  };

  return (
    <ImageBackground
      source={require("../../../../assets/img/imagvaledad2.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.logoText}>Cultiva con GanjApp</Text>
        <View style={styles.textContainer}>
          <Text style={styles.questionText}>¿Tienes 18 años o más?</Text>
          <Text style={styles.descriptionText}>
            GanjApp requiere que cumplas con los requisitos legales de edad de tu zona para acceder a información sobre
            cannabis a través de la aplicación.
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>ACEPTAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>RECHAZAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  logoText: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  textContainer: {
    width: "90%",
    marginBottom: 30,
  },
  questionText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 15,
  },
  confirmText: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 20,
  },
  linkText: {
    color: "#ADD8E6",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15, // Espacio entre los botones
  },
  acceptButton: {
    backgroundColor: "#00CC66",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 60,
    width: "80%",
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  rejectButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 60,
    width: "80%",
    alignItems: "center",
  },
  rejectButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default AgeValidationScreen;
