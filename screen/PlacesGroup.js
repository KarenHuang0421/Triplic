import React, { useState } from "react";
import { StyleSheet , TouchableOpacity } from "react-native";
import { Column, Row, StyleText } from "../component/components";
import { Card } from "react-native-elements";

const dataFromApi = [
    {
        id: 1,
        name: 'place_card 1'
    },
    {
        id: 2,
        name: 'place_card 2'
    },
    {
        id: 3,
        name: 'place_card 3'
    },
    {
        id: 4,
        name: 'place_card 4'
    }
]

const PlacesGroup = ({ navigation, onPress }) => {
    const [cards , setCards] = useState(dataFromApi);
    return(
        <Column h="center" v="center">
        {cards.map((item, key) => (
            <TouchableOpacity
                key={key}
                style={{ width: "100%" }}
                onPress={() =>
                    navigation.navigate("Place", {
                        name: `${item.name} 活動`,
                        page: 0,
                    })
                }
            >
                <Card>
                    <Card.Title style={{textAlign:'left'}}>{item.name}</Card.Title>
                    <Card.Divider />
                    <Column>
                        <StyleText>address...</StyleText>
                    </Column>
                </Card>
            </TouchableOpacity>
        ))}
    </Column>
    )
}
export default PlacesGroup;

const styles = StyleSheet.create({
    box: {
        width: 250,
        height: 100
    }
});