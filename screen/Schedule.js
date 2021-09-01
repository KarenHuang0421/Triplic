import React, { useState } from 'react';
import { Column, Row, StyleText } from '../component/components';
import { getEvent } from './data.js';
import { Dimensions, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import TripSchedule from "../component/schedule/TripSchedule";

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

const Arrange = ({ events, addEvent, addOneDay, isEquivalent }) => {
    let { width } = Dimensions.get("window");

    function eventTapped(event) {
        const index = events.events.findIndex((i) => isEquivalent(event, i));
        console.log(index);
    }

    return(
        // <Column style={{width: '100%'}}>
        <View style={{ flex: 1 }}>
            <TripSchedule
                eventTapped={(event) => {
                    eventTapped(event);
                }}
                events={events.events}
                width={width}
                initDay={1}
                scrollToFirst
                upperCaseHeader
                uppercase
                scrollToFirst={true}
                size={events.dayCount}
                lineHeight={100}
                addOneDay={addOneDay}
            />
            <Button
                title={"Click"}
                onPress={() =>  
                    addEvent({
                    day: 4,
                    start: "08:30:00",
                    end: "09:20:00",
                    title: "Dr. Mariana Joseph",
                    summary: "3412 Piedmont Rd NE, GA 3032",
                })}
            />
        </View>
            
        // </Column>
    )
}

const Schedule = () => {
    const [page , setPage] = useState(0)
    const [events, setEvents] = useState(getEvent);


    function addEvent(addEvent) {
        var newEventArray = [...events.events];
        newEventArray.push(addEvent);
        let newEvent = {
            ...events,
            events: newEventArray,
        };
        setEvents(newEvent);
    }

    function isEquivalent(a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    return(
        <Column h="center" style={{width: '100%', height: '100%'}}>
            {page == 0 ? 
                <FillInfo onClick={() => setPage(1)} /> : 
                <Arrange 
                    events={events}
                    addEvent={addEvent}
                    addOneDay={() => {
                        setEvents({
                            ...events,
                            dayCount: events.dayCount + 1,
                        });
                    }}
                    isEquivalent={(event, i) => isEquivalent(event, i)} />}
        </Column>
    )
}
export default Schedule;