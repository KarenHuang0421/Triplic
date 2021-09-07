import React from "react";
import { StyleSheet , TouchableOpacity } from "react-native";
import { Column, Row, StyleText } from "../components";
import { Card as RNCard } from "react-native-elements";

const Box = ({ data, onPress }) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <RNCard wrapperStyle={styles.box}>
                <StyleText>{data.title}</StyleText>
            </RNCard>
        </TouchableOpacity>
    )
}
export default Box;

const styles = StyleSheet.create({
    box: {
        // backgroundColor: "yellow",
        // margin: 20,
        width: 250,
        height: 100
    }
});