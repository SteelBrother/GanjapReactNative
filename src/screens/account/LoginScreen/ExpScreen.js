import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ExpScreen = ({ onSetLoggedIn }) => {
  const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);
  const [userType, setUserType] = useState(null); // Guardar tipo de usuario seleccionado

  // Función para guardar el tipo de usuario y nivel de experiencia en Firebase
  const saveUserPreferences = async (level) => {
    const db = getFirestore();
    const userId = getAuth().currentUser.uid; // Obtener UID del usuario actual

    try {
      await setDoc(doc(db, "users", userId), {
        userId: userId,
        userType,
        experienceLevel: level,
      }, { merge: true });

      console.log("Preferencias guardadas exitosamente.");
      onSetLoggedIn(); // Cambia el estado a logged in o navega a la siguiente pantalla
    } catch (error) {
      console.error("Error al guardar las preferencias:", error);
    }
  };

  const handleSelectUserType = (type) => {
    setUserType(type);
    setIsUserTypeSelected(true); // Muestra las opciones de nivel de experiencia
  };

  const handleSelectLevel = (level) => {
    saveUserPreferences(level); // Guarda las preferencias en Firebase
  };

  return (
    <View style={styles.container}>
      {!isUserTypeSelected ? (
        <View style={styles.optionContainer}>
          <Image source={require("../../../../assets/icon.png")} style={styles.icon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>¿Eres un usuario PRO o un usuario no PRO?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.proButton} 
                onPress={() => handleSelectUserType("pro")}
              >
                <Text style={styles.buttonText}>USUARIO PRO</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.nonProButton} 
                onPress={() => handleSelectUserType("no-pro")}
              >
                <Text style={styles.buttonText}>USUARIO NO PRO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.title}>
            ¿Cuál es tu nivel de experiencia y conocimiento en el cultivo de cannabis?
          </Text>
          
          <View style={styles.optionContainer}>
            <Image source={require("../../../../assets/icon.png")} style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>No tengo experiencia. Quiero aprender desde cero.</Text>
              <TouchableOpacity 
                style={styles.beginnerButton} 
                onPress={() => handleSelectLevel("principiante")}
              >
                <Text style={styles.buttonText}>COMENZAR COMO PRINCIPIANTE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Image source={require("../../../../assets/icon.png")} style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>He cultivado antes, pero quiero mejorar mis técnicas.</Text>
              <TouchableOpacity 
                style={styles.intermediateButton} 
                onPress={() => handleSelectLevel("novato")}
              >
                <Text style={styles.buttonText}>COMENZAR COMO NOVATO</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Image source={require("../../../../assets/icon.png")} style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Soy cultivador experimentado y busco apoyo técnico avanzado.</Text>
              <TouchableOpacity 
                style={styles.expertButton} 
                onPress={() => handleSelectLevel("experto")}
              >
                <Text style={styles.buttonText}>COMENZAR COMO EXPERTO</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footerText}>
            Personalizaremos la app según tu nivel de experiencia para brindarte la guía más adecuada.
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  proButton: {
    backgroundColor: "#00CC66",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 5,
  },
  nonProButton: {
    backgroundColor: "#FF6666",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  beginnerButton: {
    backgroundColor: "#00CC66",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  intermediateButton: {
    backgroundColor: "#00CC66",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  expertButton: {
    backgroundColor: "#00CC66",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#00CC66",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ExpScreen;
