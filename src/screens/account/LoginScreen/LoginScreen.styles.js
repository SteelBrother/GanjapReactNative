import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  input: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderColor: "#dcdcdc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    color: "#888",
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  registerText: {
    marginTop: 20,
    color: "#007bff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
