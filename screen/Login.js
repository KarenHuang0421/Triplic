import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Row, Column, StyleText } from "../component/components";

import clientId from "../config/clientId.json";
import API from "../config/API.json";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
const Login = () => {
    const navigation = useNavigation();
    // test
    async function storeData(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            return navigation.navigate("Group");
        } catch (e) {
            // saving error
        }
    }
    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                ...clientId,
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                setLogState("Login");
                // console.log(result);
                fetch(API.googleSignIn, {
                    method: "POST",
                    body: JSON.stringify({
                        userInfo: result.user,
                        idToken: result.idToken,
                        ...clientId,
                    }),
                })
                    .then((res) => res.json())
                    .catch((error) => console.error("Error:", error))
                    .then((response) => response.localKey)
                    .then((localKey) =>
                        AsyncStoreage.setItem("localKey", localKey)
                    );
                return navigation.navigate("Group");
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    return (
        <Column v="center" h="center" style={{ height: "100%" }}>
            <View style={{ width: "50%" }}>
                <Button
                    title="login"
                    onPress={() => storeData("localKey", "sdfz1d")}
                />
            </View>
        </Column>
    );
};
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        margin: 20,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#406E9F",
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});
