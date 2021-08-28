import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { Row, Column, StyleText } from "../component/components";

import API from "../config/API.json";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Loading = () => {
    const navigation = useNavigation();

    // get localKey from local DB
    async function getLocalKey() {
        try {
            const localKey = await AsyncStorage.getItem("localKey");
            // await fetch(API.searchUserByKey, {
            //     method: "POST",
            //     body: JSON.stringify({ localKey: localKey }),
            // })
            //     .then((res) => res.json())
            //     .catch((error) => console.error("Error:", error))
            //     .then((response) => response.id);
            return localKey;
        } catch (e) {
            console.log(e);
        }
    }
    getLocalKey().then((localKey) => {
        if (!!localKey) {
            navigation.reset({ index: 0, routes: [{ name: "Group" }] });
        } else {
            navigation.navigate("Login");
        }
    });

    return (
        <Column v="center" h="center" style={{ height: "100%" }}>
            <View style={{ width: "50%" }}>
                <Button title="Loading" />
            </View>
        </Column>
    );
};
export default Loading;
