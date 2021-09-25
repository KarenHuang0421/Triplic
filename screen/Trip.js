import React, { useState } from "react";
import { FlatList, StyleSheet , TouchableOpacity, Image, ScrollView } from "react-native";
import { Column, Row, StyleText } from "../component/components";
import { Button, Card } from "react-native-elements";
import TimelineScreen from "./TimelineScreen";

const Trip = ({ route, navigation }) => {
    const [open, setOpen] = useState(false)

    const User = () => {
        return(
            <Card containerStyle={styles.card}>
                <Card.Title style={{textAlign:'left'}}>資訊</Card.Title>
                <Column>
                    <StyleText>旅程： 阿里山三天兩日遊</StyleText>
                    <StyleText>旅行者：karen, kyle</StyleText>
                    <StyleText>起始日期：2021/09/06 </StyleText>
                    <StyleText>結束日期：2021/09/08 </StyleText>
                    <StyleText>總花費： $560</StyleText>
                </Column>
            </Card>
        )
    }


    const Content = () => {
        return(
            <Column>
                <Image style={styles.banner} source={require("../assets/banner_ex.jpg")} />
                <Column style={{paddingHorizontal: 15}}>
                    <User />
                    <Card containerStyle={styles.card}>
                        <Card.Title style={{textAlign:'left'}}>行程表</Card.Title>
                        {open && <TimelineScreen route={route} navigation={navigation} />}
                            <TouchableOpacity style={{width:'100%'}} onPress={() => setOpen(!open)}>
                                <StyleText style={{textAlign: 'center'}} color="#ccc">{!open ? 'OPEN' : 'CLOSE'}</StyleText>    
                            </TouchableOpacity>    
                    </Card>
                </Column>
            </Column>
        )
    }

    const Footer = () => {

        const collect = () => {
            console.log('collect')
        }

        return(
            <Column style={{padding: 15}}>
                <Button 
                    title="收藏" 
                    containerStyle={{marginVertical:24}} 
                    onPress={() => collect()} />
            </Column>
        )
    }
      
    return(
        <Column>
            <FlatList
                // ListHeaderComponent={<TimelineScreen route={route} navigation={navigation} />}
                ListHeaderComponent={Content}
                ListFooterComponent={Footer}>
                {/* <Image style={styles.banner} source={require("../assets/banner_ex.jpg")} />
                <Column style={{paddingHorizontal: 15, height: 1000, overflow: 'scroll'}}>
                    <Card containerStyle={styles.card}>
                        <Card.Title style={{textAlign:'left'}}>行程</Card.Title>
                        <Column style={styles.cardContent}>
                            <TimelineScreen route={route} navigation={navigation} />
                        </Column>
                    </Card>
                </Column>
                <Row style={{height: 50, width:'100%'}} /> */}
            </FlatList>
        </Column>
    )
}
export default Trip;

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 150
    },
    card:{
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#EEE',
        backgroundColor:'white',
        marginHorizontal: 0,
    },
    box: {
        width: 250,
        height: 100
    }
});