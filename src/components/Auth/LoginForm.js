// LoginForm.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";  
import { initialValues, validationSchema } from "./LoginForm.data";
import { styles } from "./LoginForm.styles";
import { Image } from 'react-native';


export function LoginForm({ onLogin }) { // Asegúrate de recibir `onLogin`
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      formik.setSubmitting(true);
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        onLogin(); // Llama a `onLogin` para actualizar el estado en el padre
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: error.message || "Usuario o contraseña incorrectos",
        });
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Image source={require("../../../assets/img/app-logo.png")} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon} />}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
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
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
      <Text style={styles.registerLink} onPress={() => navigation.navigate(screen.Auth.register)}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}
