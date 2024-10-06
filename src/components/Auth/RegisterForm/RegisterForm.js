import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

// Esquema de validación usando Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Correo requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmación de contraseña requerida"),
});

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Alert.alert("Registro exitoso", "Formulario enviado: " + JSON.stringify(values));
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
        onChangeText={formik.handleChange("email")}
        value={formik.values.email}
        onBlur={formik.handleBlur("email")}
      />
      {formik.touched.email && formik.errors.email ? (
        <Text style={styles.error}>{formik.errors.email}</Text>
      ) : null}

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={styles.error}>{formik.errors.password}</Text>
      ) : null}

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirma tu contraseña"
        secureTextEntry
        onChangeText={formik.handleChange("confirmPassword")}
        value={formik.values.confirmPassword}
        onBlur={formik.handleBlur("confirmPassword")}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
      ) : null}

      <Button title="Registrarse" onPress={formik.handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

