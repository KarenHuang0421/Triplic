import React from "react";
import { StyleSheet , TouchableOpacity } from "react-native";
import { Column, Row, StyleText } from "../components";
import { Card as RNCard } from "react-native-elements";

const Card = ({ data, onPress }) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <RNCard wrapperStyle={styles.card}>
                <Row style={styles.picture} />
                <StyleText fontSize={20}>{data.name}</StyleText>
            </RNCard>
        </TouchableOpacity>
    )
}
export default Card;

const styles = StyleSheet.create({
    card: {
        // backgroundColor: "green",
        // margin: 20,
        width: 260,
        height: 300
    },
    picture: {
        backgroundColor: 'rgba(0, 0, 0 ,.05)',
        marginBottom: 10,
        width: '100%',
        height: 150
    }
});