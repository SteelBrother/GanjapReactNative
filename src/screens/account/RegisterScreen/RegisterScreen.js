import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements"; // Verifica que 'react-native-elements' esté instalado en tu proyecto
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../../components/Auth/RegisterForm/RegisterForm"; // Verifica que la ruta sea correcta
import { styles } from "./RegisterScreen.styles"; // Verifica que este archivo contenga las clases de estilo necesarias

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}


