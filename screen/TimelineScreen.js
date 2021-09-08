import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Button,
} from "react-native";

import Timeline from "react-native-timeline-flatlist";
import Preview from "../component/imageFlatList/Preview";
import FlatListSlider from "../component/imageFlatList/FlatListSlider";
import ChildItem from "../component/imageFlatList/ChildItem";
import moment from "moment";
import DaySelector from "../component/DaySelector";

const TimelineScreen = ({ route, navigation }) => {
    const imageData = [
        {
            image: "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
            desc: " ",
        },
        {
            image: "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
            desc: " ",
        },
        {
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            desc: " ",
        },
        {
            image: "https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            desc: "Sample Description below",
        },
        {
            image: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
            desc: "Sample Description below",
        },
    ];

    const [data, setData] = useState({
        dayCount: 3,
        startDate: "2021/09/06",
        events: [
            {
                day: 1,
                start: "09:00",
                end: "10:00",
                title: "Archery Training",
                notes: "The Beginner Archery and Beginner Crossbow course does ",
                imageUrl: imageData,
            },
            {
                day: 1,
                start: "10:45",
                end: "12:00",
                title: "Play Badminton",
                notes: "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",
                imageUrl: imageData,
            },
            {
                day: 1,
                start: "12:00",
                end: "13:00",
                title: "Lunch",
            },
            {
                day: 1,
                start: "14:00",
                end: "15:00",
                title: "Watch Soccer",
                notes: "Team sport played between two teams of eleven players with a spherical ball. ",
                imageUrl: imageData,
            },
            {
                day: 1,
                start: "16:30",
                end: "17:00",
                title: "Go to Fitness center",
                notes: "Look out for the Best Gym & Fitness Centers around me :)",
            },
        ],
    });

    // select day
    const daySelectorOnPress = (id) => {
        setShowData(dataFilter(data.events, id));
    };

    function dataFilter(data, day) {
        var result = data.filter((obj) => {
            return obj.day == day;
        });

        return result.sort((a, b) => (a.start > b.start ? 1 : -1));
    }
    const [showData, setShowData] = useState(dataFilter(data.events, 1));

    // if any change in schedule
    useEffect(() => {
        if (route.params?.data) {
            let sortedData = {
                ...route.params.data,
                events: route.params.data.events.sort((a, b) =>
                    a.start > b.start ? 1 : -1
                ),
            };
            setData(sortedData);
            setShowData(dataFilter(sortedData.events, 1));
        }
    }, [route.params?.data]);

    const [selected, setSelected] = useState(null);

    const onEventPress = (data) => {
        setSelected(data);
    };

    const renderSelected = () => {
        if (selected)
            alert(`Selected event: ${selected.title} at ${selected.time}`);
    };

    const renderTime = (rowData, sectionID, rowID) => {
        return (
            <View style={{ alignItems: "flex-end" }}>
                <View
                    style={{
                        minWidth: 52,
                        marginTop: -5,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            backgroundColor: "#ff9797",
                            color: "white",
                            padding: 5,
                            borderRadius: 15,
                            overflow: "hidden",
                        }}
                    >
                        {rowData.start}
                    </Text>
                </View>
            </View>
        );
    };

    const renderDetail = (rowData, sectionID, rowID) => {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>;
        var desc = null;
        desc = (
            <View style={styles.descriptionContainer}>
                <Text style={[styles.textDescription]}>{rowData.notes}</Text>
                {!!route.params.page && (
                    <View>
                        <FlatListSlider
                            data={rowData.imageUrl}
                            width={175}
                            autoscroll={false}
                            component={<Preview />}
                            onPress={(item) => alert(JSON.stringify(item))}
                            indicatorActiveWidth={40}
                            contentContainerStyle={{ paddingHorizontal: 0 }}
                        />
                    </View>
                )}
            </View>
        );

        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
            </View>
        );
    };

    // props page: 0 means TripSchedule, 1 means TripLog
    return (
        <View style={{ flex: 1 }}>
            {renderSelected()}
            <View style={styles.container}>
                {route.params.page == 0 ? (
                    <TouchableOpacity
                        style={{ alignSelf: "flex-end" }}
                        // navigate to scheduler
                        onPress={() => {
                            navigation.navigate("Page2-2", {
                                name: `編輯 ${route.params.name}`,
                                page: 1,
                                data: data,
                            });
                        }}
                    >
                        <Text>編輯</Text>
                    </TouchableOpacity>
                ) : (
                    <Text>Trip Log head banner</Text>
                )}
                <DaySelector
                    dayCount={data.dayCount}
                    onPress={daySelectorOnPress}
                    startDate={data.startDate}
                />
                <Timeline
                    style={styles.list}
                    data={showData}
                    circleSize={30}
                    dotSize={14}
                    circleColor="rgb(45,156,219)"
                    lineColor="rgb(45,156,219)"
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{
                        textAlign: "center",
                        backgroundColor: "#ff9797",
                        color: "white",
                        padding: 5,
                        borderRadius: 13,
                    }}
                    descriptionStyle={{ color: "gray" }}
                    options={{
                        style: { paddingTop: 5 },
                    }}
                    innerCircle={"dot"}
                    onEventPress={onEventPress}
                    renderTime={renderTime}
                    renderDetail={renderDetail}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        backgroundColor: "white",
    },
    contentStyle: {
        paddingHorizontal: 16,
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    descriptionContainer: {
        // flexDirection: "row",
        paddingRight: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textDescription: {
        marginLeft: 10,
        color: "gray",
    },
});

export default TimelineScreen;
