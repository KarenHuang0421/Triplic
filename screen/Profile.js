import React from "react";
import { Column, Row, StyleText } from "../component/components";
import { Avatar, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

const Profile = () => {
    const navigation = useNavigation();
    async function removeValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        } catch (e) {
            // remove error
        }
    }

    return (
        <Column h="center" style={{ height: "100%", paddingHorizontal: 20 }}>
            <Column v="center" style={{ height: "20%" }}>
                <Avatar
                    size="medium"
                    rounded
                    title="MT"
                    overlayContainerStyle={{ backgroundColor: "#ccc" }}
                    icon={{ name: "user", type: "font-awesome" }}
                    activeOpacity={0.7}
                />
            </Column>
            <Column
                v="space-between"
                h="center"
                style={{ width: "100%", height: "80%" }}
            >
                <Button
                    containerStyle={{ width: "100%" }}
                    title="登出"
                    onPress={() => {
                        removeValue("localKey");
                    }}
                />
                <Text>版本號v1.0.0</Text>
            </Column>
        </Column>
    );
};
export default Profile;
