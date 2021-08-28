import React from "react";
// import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { Row, StyleText } from "../component/components";

import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
    // const navigation = useNavigation();
    // async function removeValue(key) {
    //     try {
    //         await AsyncStorage.removeItem(key);
    //         navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    //     } catch (e) {
    //         // remove error
    //     }
    // }

    return (
        <Row h="center" v="center">
            <StyleText>Home</StyleText>
            {/* <Button
                title="logout"
                onPress={() => {
                    removeValue("localKey");
                }}
            /> */}
        </Row>
    );
};
export default Home;
