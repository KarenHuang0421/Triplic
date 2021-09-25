import React, { useState } from "react";
import { StyleSheet , TouchableOpacity } from "react-native";
import { Column, Row, StyleText } from "../component/components";
import { Button, Card, Text } from "react-native-elements";

const data = {
    name: 'placeName',
    address: 'address',
    description: 'description'
}

const Place = ({ onPress }) => {
    const collect = () => {
        //putApi
        console.log('put')
    }

    return(
        <Column h="center" v="center" style={{paddingHorizontal: 15}}>
            <Card containerStyle={{width: '100%'}}>
                <Column style={styles.image} />
                <Text h4 h4Style={{marginVertical:16}}>{data.name}</Text>
                <StyleText style={{color: 'grey', fontSize: 16}}>地點：{data.address}</StyleText>
                <StyleText style={{color: 'grey', fontSize: 16}}>描述：{data.description}</StyleText>
                <Button 
                    title="收藏" 
                    containerStyle={{marginTop:24}} 
                    onPress={() => collect()} />
            </Card>
        </Column>
    )
}
export default Place;

const styles = StyleSheet.create({
    box: {
        width: 250,
        height: 100
    },
    image: {
        backgroundColor: '#e5e5e5',
        width: '100%',
        height: 200
    }
});