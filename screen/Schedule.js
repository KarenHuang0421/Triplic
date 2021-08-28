import React, { useState } from 'react';
import { Column, Row, StyleText } from '../component/components';
import { Button, Input, Text } from 'react-native-elements';


const FillInfo = ({ onClick }) => {
    return(
        <Column v="space-between" style={{width: '90%', height: '100%', paddingVertical: 20}}>
            <Column>
                <Text h4 style={{marginBottom: 20}}>Step 1</Text>
                <Column>
                    <Input placeholder='input name' label="Name" containerStyle={{marginBottom: 20}} />
                    <Input placeholder='input number of days' label="Days" />
                </Column>
            </Column>
            <Button title="NEXT" onPress={onClick} />
        </Column>
    )
}

const Arrange = () => {
    return(
        <Column style={{width: '90%'}}>
            
        </Column>
    )
}

const Schedule = () => {
    const [page , setPage] = useState(0)
    return(
        <Column h="center" style={{width: '100%', height: '100%'}}>
            {page == 0 ? 
                <FillInfo onClick={() => setPage(1)} /> : 
                <Arrange />}
        </Column>
    )
}
export default Schedule;