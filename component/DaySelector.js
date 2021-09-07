import React, { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
    Button,
    Text,
} from "react-native";
import moment from "moment";

const DaySelector = ({ dayCount, onPress, startDate, addDay = false }) => {
    var flatListData = [];
    for (var x = 1; x <= dayCount; x++) {
        flatListData.push({
            id: String(x),
            day: "Day" + String(x),
            date: moment(startDate, "YYYY/MM/DD")
                .add(x - 1, "days")
                .format("MM/DD"),
        });
    }

    const [selectedDay, setSelectedDay] = useState(1);
    const _renderFlatListItem = ({ item }) => {
        // clicked item: first color, unclicked item: second color
        const backgroundColor =
            item.id === String(selectedDay) ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === String(selectedDay) ? "white" : "black";

        const FlatListItem = ({
            item,
            onPress,
            backgroundColor,
            textColor,
        }) => (
            <TouchableOpacity
                onPress={onPress}
                style={[styles.flatListItem, backgroundColor]}
            >
                <Text style={[styles.flatListText, textColor]}>{item.day}</Text>
                <Text style={[styles.flatListText, textColor]}>
                    {item.date}
                </Text>
            </TouchableOpacity>
        );

        return (
            <FlatListItem
                item={item}
                onPress={() => {
                    setSelectedDay(item.id);
                    onPress(item.id);
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View
            style={{
                height: 70,
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <FlatList
                data={flatListData}
                renderItem={_renderFlatListItem}
                keyExtractor={(item) => item.id}
                extraData={selectedDay}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            {/* add day button  */}
            {addDay && (
                <Button
                    title={"add day"}
                    onPress={() => {
                        addDay();
                    }}
                />
            )}
        </View>
    );
};

export default DaySelector;

const styles = StyleSheet.create({
    flatListItem: {
        backgroundColor: "#f9c2ff",
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        alignItems: "center",
    },
    flatListText: {
        fontSize: 16,
    },
});
