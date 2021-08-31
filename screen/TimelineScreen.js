import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Timeline from "react-native-timeline-flatlist";
import Preview from "../component/imageFlatList/Preview";
import FlatListSlider from "../component/imageFlatList/FlatListSlider";
import ChildItem from "../component/imageFlatList/ChildItem";

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

    const data = [
        {
            time: "09:00",
            title: "Archery Training",
            description:
                "The Beginner Archery and Beginner Crossbow course does ",
            lineColor: "#009688",
            imageUrl: imageData,
        },
        {
            time: "10:45",
            title: "Play Badminton",
            description:
                "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",
            imageUrl: imageData,
        },
        {
            time: "12:00",
            title: "Lunch",
        },
        {
            time: "14:00",
            title: "Watch Soccer",
            description:
                "Team sport played between two teams of eleven players with a spherical ball. ",
            lineColor: "#009688",
            imageUrl: imageData,
        },
        {
            time: "16:30",
            title: "Go to Fitness center",
            description:
                "Look out for the Best Gym & Fitness Centers around me :)",
        },
    ];

    const [selected, setSelected] = useState(null);

    const onEventPress = (data) => {
        setSelected(data);
    };

    const renderSelected = () => {
        if (selected)
            alert(`Selected event: ${selected.title} at ${selected.time}`);
    };

    const renderDetail = (rowData, sectionID, rowID) => {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>;
        var desc = null;
        if (rowData.description && rowData.imageUrl) {
            desc = (
                <View style={styles.descriptionContainer}>
                    <Text style={[styles.textDescription]}>
                        {rowData.description}
                    </Text>
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
                </View>
            );
        }

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
            {route.params.page == 0 ? (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{ alignSelf: "flex-end" }}
                        // navigate to scheduler
                        onPress={() => {
                            navigation.navigate("Page2-2", {
                                title: "Page2-2",
                            });
                        }}
                    >
                        <Text>編輯</Text>
                    </TouchableOpacity>
                    <Timeline
                        style={styles.list}
                        data={data}
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
                    />
                </View>
            ) : (
                <View style={styles.container}>
                    {/* TripLog head banner... or something */}
                    <Text>TripLog head banner</Text>
                    <Timeline
                        style={styles.list}
                        data={data}
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
                        renderDetail={renderDetail}
                    />
                </View>
            )}
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
