// LoginForm.styles.js
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 120,  // Tamaño del logo, puedes ajustarlo según necesites
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: "100%",
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#34d399",
  },
  registerLink: {
    marginTop: 15,
    color: "#3498db",
    textDecorationLine: "underline",
  },
});
