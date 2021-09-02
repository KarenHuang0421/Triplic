// @flow
import {
    VirtualizedList,
    View,
    TouchableOpacity,
    Image,
    Text,
    Button,
    StyleSheet,
    FlatList,
} from "react-native";
import _ from "lodash";
import moment from "moment";
import React from "react";

import styleConstructor from "./style";

import DayView from "./DayView";

var lineHeight = 100;

export default class TripSchedule extends React.Component {
    constructor(props) {
        super(props);

        lineHeight = props.lineHeight;
        const start = props.start ? props.start : 0;
        const end = props.end ? props.end : 24;
        this.styles = styleConstructor(
            props.styles,
            (end - start) * lineHeight
        );

        var flatListData = [];
        for (var x = 1; x <= this.props.size; x++) {
            flatListData.push({
                id: String(x),
                day: "Day" + String(x),
                date: moment(this.props.startDate, "YYYY/MM/DD")
                    .add(x - 1, "days")
                    .format("MM/DD"),
            });
        }

        this.state = {
            index: 0,
            lastDayCount: this.props.size,
            flatListData: flatListData,
        };
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.size !== prevState.lastDayCount) {
            return {
                ...prevState,
                lastDayCount: nextProps.size,
                flatListData: [
                    ...prevState.flatListData,
                    {
                        id: String(nextProps.size),
                        title: "Day" + String(nextProps.size),
                    },
                ],
            };
        }
        return null;
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    _getItemLayout(data, index) {
        const { width } = this.props;
        return { length: width, offset: width * index, index };
    }

    _getItem(events, index) {
        const day = 1 + index;

        const filtered = events.reduce((a, o) => {
            if (o.day == day) {
                // DayView component need a date format to calculate,
                // so we rewrite the value of start, end in events.
                var n = Object.assign({}, o);
                n.start = "2021-08-21 " + o.start;
                n.end = "2021-08-21 " + o.end;
                a.push(n);
            }
            return a;
        }, []);
        return filtered;
    }

    _renderItem({ index, item }) {
        const {
            width,
            format24h,
            scrollToFirst = true,
            start = 0,
            end = 24,
        } = this.props;

        return (
            <View style={[this.styles.container, { width }]}>
                <DayView
                    index={index}
                    format24h={format24h}
                    renderEvent={this.props.renderEvent}
                    eventTapped={this.props.eventTapped}
                    events={item}
                    width={width}
                    styles={this.styles}
                    scrollToFirst={scrollToFirst}
                    start={start}
                    end={end}
                    lineHeight={lineHeight}
                />
            </View>
        );
    }

    _goToPage(index) {
        if (index < 0 || index >= this.props.size) {
            return;
        }
        // when selecting the same day don't re-render and scroll,
        // improve performance.
        if (index != this.state.index) {
            this.setState({ index: index });
            this.calendar.scrollToIndex({ index, animated: false });
        }
    }

    _goToDay(day) {
        this._goToPage(day - 1);
    }

    // flatList on the top to select day
    _renderFlatListItem = ({ item }) => {
        // clicked item: first color, unclicked item: second color
        const backgroundColor =
            item.id === String(this.state.index + 1) ? "#6e3b6e" : "#f9c2ff";
        const color =
            item.id === String(this.state.index + 1) ? "white" : "black";

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
                onPress={() => this._goToDay(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };
    render() {
        return (
            <View style={[this.styles.container, { width: this.props.width }]}>
                <View
                    style={{
                        height: 70,
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <FlatList
                        data={this.state.flatListData}
                        renderItem={this._renderFlatListItem}
                        keyExtractor={(item) => item.id}
                        extraData={this.state.index + 1}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    {/* add day button  */}
                    <Button
                        title={"add day"}
                        onPress={() => {
                            // call Schedule.js addOneDay function to set the day count of events
                            this.props.addOneDay();
                        }}
                    />
                </View>
                <VirtualizedList
                    ref={(ref) => {
                        this.calendar = ref;
                    }}
                    windowSize={2}
                    initialNumToRender={2}
                    initialScrollIndex={0}
                    data={this.props.events}
                    getItemCount={() => this.props.size}
                    getItem={this._getItem.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    getItemLayout={this._getItemLayout.bind(this)}
                    horizontal
                    pagingEnabled
                    renderItem={this._renderItem.bind(this)}
                    style={{ width: this.props.width }}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        );
    }
}
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
