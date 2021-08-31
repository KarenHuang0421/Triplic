import React from "react";
// import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { Column, StyleText } from "../component/components";

const Home = ({ navigation }) => {
    return (
        <Column h="center" v="center">
            <StyleText>Home</StyleText>
            <Button
                title="阿里山三天兩日遊"
                onPress={() => {
                    navigation.navigate("TimelineScreen", {
                        name: `阿里山三天兩日遊`,
                        page: 1,
                    });
                }}
            />
        </Column>
    );
};
export default Home;
