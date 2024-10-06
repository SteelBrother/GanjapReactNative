// LoginScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { LoginForm } from "../../../components/Auth/LoginForm";

const LoginScreen = ({ onLogin }) => {
    return (
        <View style={styles.container}>
            <LoginForm onLogin={onLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LoginScreen;