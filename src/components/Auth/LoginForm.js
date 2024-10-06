import React, { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";  
import { initialValues, validationSchema } from "./LoginForm.data";
import { styles } from "./LoginForm.styles";

export function LoginForm({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const onShowHidePassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      formik.setSubmitting(true);
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
        onLogin();
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

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.content}>
        <Input
          placeholder="Correo electrónico"
          containerStyle={styles.input}
          inputContainerStyle={{ borderBottomWidth: 1 }} // Borde inferior
          rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon} />}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
          autoCapitalize="none"
          inputStyle={{ color: "#000" }} // Color del texto
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
              onPress={onShowHidePassword}
            />
          }
          onChangeText={(text) => formik.setFieldValue("password", text)}
          errorMessage={formik.errors.password}
          inputContainerStyle={{ borderBottomWidth: 1 }} // Borde inferior
        />
        <Button
          title="Iniciar sesión"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
        <TouchableOpacity onPress={() => navigation.navigate(screen.Auth.register)}>
          <Text>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}