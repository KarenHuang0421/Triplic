import React from 'react';
import { useNavigation } from "@react-navigation/core";
import { Button, View } from 'react-native';
import { Row, Column, StyleText } from '../component/components';
const Login = () => {
    const navigation = useNavigation();

    return(
        <Column v="center" h="center" style={{height: '100%'}}>
            <View style={{width: '50%'}}>
                <Button title="login" onPress={() => navigation.navigate('Group')} />
            </View>
        </Column>
    )
}
export default Login;