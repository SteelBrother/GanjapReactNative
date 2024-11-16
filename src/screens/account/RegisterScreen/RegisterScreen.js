import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./RegisterScreen.styles";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./RegisterScreen.data";
import { Image } from 'react-native';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, formValue.email.trim(), formValue.password.trim());
        navigation.navigate("AgeValidation"); // Navega a la pantalla de validación de edad
      } catch (error) {
        let errorMessage = "Error al registrarse, inténtelo más tarde";
  
        // Manejo de errores específicos de Firebase
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "El correo electrónico ya está en uso. Prueba con otro o inicia sesión si ya tienes cuenta.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "El correo electrónico no es válido.";
        } else if (error.code === 'auth/weak-password') {
          errorMessage = "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
        }
  
        // Mostrar error para depuración (puedes comentar esto en producción)
        console.error('Firebase registration error: ', error);
  
        Toast.show({
          type: "error",
          position: "bottom",
          text1: errorMessage,
        });
      }
    },
  });
  
  const togglePasswordVisibility = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Image source={require("../../../../assets/img/app-logo.png")} style={styles.logo} />
      <Text style={styles.title}>Registro</Text>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon} />}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={togglePasswordVisibility}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
        autoCapitalize="none"
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={togglePasswordVisibility}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
        autoCapitalize="none"
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
