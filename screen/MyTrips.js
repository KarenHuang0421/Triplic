import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Column, Row, StyleText } from "../component/components";
import { Button, Card } from "react-native-elements";

const ToolBar = ({ onPress }) => {
    return(
        <Row style={styles.segmentedControl}>
            <TouchableOpacity
                style={{width: '50%'}}
                onPress={onPress}>
                <StyleText 
                    flex={1} 
                    style={styles.segmented}>
                        tab 1
                </StyleText>
            </TouchableOpacity>
            <Column style={{width:1, height:'100%', backgroundColor:'#2089dc' }}  />
            <TouchableOpacity
                style={{width: '50%'}}
                onPress={onPress}>
                <StyleText 
                    flex={1} 
                    style={styles.segmented}>
                    tab 2
                </StyleText>
            </TouchableOpacity>
        </Row>
    )
}

const Content = ({ add, data, onPress, type }) => {
    return(
        <Column h="center" v="center" style={{width: '100%'}}>
            {data.map((item, key) => (
                <TouchableOpacity
                    key={key}
                    style={{ width: "90%" }}
                    // onPress={() =>
                    //     navigation.navigate("TimelineScreen", {
                    //         name: `CARD ${key + 1} 行程表`,
                    //         page: 0,
                    //     })
                    // }
                    onPress={() => onPress(key)}
                >
                    <Card containerStyle={{ marginHorizontal: 0, width: "100%" }}>
                        <Card.Title>CARD {key + 1}</Card.Title>
                        <Card.Divider />
                        <Column>
                            <StyleText>content</StyleText>
                        </Column>
                    </Card>
                </TouchableOpacity>
            ))}
            {!type && <Button
                title="ADD CARD"
                containerStyle={{ width: "90%", marginTop: 20 }}
                onPress={add}
                // onPress={() =>
                //     navigation.navigate("Schedule", { name: "", page: 0 })
                // }
            />}
            {/* <Button
                title="ADD CARD"
                containerStyle={{ width: "90%", marginTop: 20 }}
                onPress={() => setCards(cards.concat({}))}
            /> */}
        </Column>
    )
}

const MyTrips = () => {
    const navigation = useNavigation();
    const [tab, setTab] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {

        if(!tab){
            setCards([{}, {}, {}])
        }else{
            setCards([])
        }
    }, [tab])

    return (
        <Column h="center">
            <ToolBar onPress={() => setTab(!tab)} />
            <Content 
                type={tab}
                data={cards}
                add={() => navigation.navigate("Schedule", { name: "", page: 0 })}
                onPress={(key) =>
                    navigation.navigate("TimelineScreen", {
                        name: `CARD ${key + 1} 行程表`,
                        page: 0,
                    })} />
        </Column>
    );
}
export default MyTrips;

const styles = StyleSheet.create({
    box: {
        width: 250,
        height: 100
    },
    segmentedControl: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#2089dc',
        margin: 'auto',
        marginTop: 16,
        width: '90%'
    },
    segmented: {
      color: '#2089dc',
      textAlign: 'center',
      paddingVertical: 5
    }
});
