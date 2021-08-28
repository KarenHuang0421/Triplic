import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Column, Row, StyleText } from '../component/components';
import { Button, Card } from 'react-native-elements'

const MyTrips = () => {
    const navigation = useNavigation();
    const [cards , setCards] = useState([{}]);

    return(
        <Column h="center" v="center">
            {cards.map((item, key) => (
                <TouchableOpacity 
                    key={key}
                    style={{width: '100%'}} 
                    onPress={() => 
                        navigation.navigate('Page2-2', { name: `CARD ${key + 1}` })}>
                    <Card containerStyle={{width: '90%'}}>
                        <Card.Title>CARD {key + 1}</Card.Title>
                        <Card.Divider/>
                        <Column>
                            <StyleText>content</StyleText>
                        </Column>
                    </Card>
                </TouchableOpacity>
            ))}
            <Button 
                title="ADD CARD" 
                containerStyle={{width: '90%', marginTop: 20}}
                onPress={() => 
                    setCards(cards.concat({}))
                } />
        </Column>
    )
}
export default MyTrips;