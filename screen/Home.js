import React from "react";
// import { useNavigation } from "@react-navigation/native";
import { Button , ScrollView , FlatList , StyleSheet } from "react-native";
import { Column, Row, StyleText } from "../component/components";
import Card from "../component/homeComp/Card";
import Box from "../component/homeComp/Box";

const data = [
    {
        id: 1,
        name: '阿里山三天兩日遊'
    },
    {
        id: 2,
        name: 'card 2'
    },
    {
        id: 3,
        name: 'card 3'
    },
    {
        id: 4,
        name: 'card 4'
    }
]

const category = [
    {
        id: 1,
        title: 'category 1'
    },
    {
        id: 2,
        title: 'category 2'
    },
    {
        id: 3,
        title: 'category 3'
    }
]

const Home = ({ navigation }) => {

    return (
        <Column v="center" style={{padding: 20}}>
            <ScrollView>
                <StyleText style={styles.title}>
                    Content Type 1
                </StyleText>
                <FlatList 
                    style={{marginLeft: -15}}
                    data={data} 
                    horizontal={true}
                    renderItem={({item}) => 
                        <Card data={item} onPress={() => {
                            navigation.navigate("TimelineScreen", {
                                name: item.name,
                                page: 1,
                            })
                        }} />} 
                    keyExtractor={item => item.id.toString()} />
                <StyleText style={styles.title}>
                    Content Type 2
                </StyleText>
                <FlatList 
                    style={{marginLeft: -15}}
                    data={category} 
                    horizontal={true}
                    renderItem={({item}) => <Box data={item} onPress={() => null} />} 
                    keyExtractor={item => item.id.toString()} />
                <Row style={{height: 300}}/>
            </ScrollView>
        </Column>
    );
};
export default Home;

const styles = StyleSheet.create({  
    title: {
        fontSize: 24,
        marginTop: 20
    },  
    wrap: {
        overflow: 'scroll'
    }
});
