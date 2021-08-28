// @flow
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import populateEvents from "./Packer";
import React from "react";
import moment from "moment";
import _ from "lodash";

const LEFT_MARGIN = 60 - 1;
// const RIGHT_MARGIN = 10
const CALENDER_HEIGHT = 2400;
// const EVENT_TITLE_HEIGHT = 15
const TEXT_LINE_HEIGHT = 17;
// const MIN_EVENT_TITLE_WIDTH = 20
// const EVENT_PADDING_LEFT = 4

function range(from, to) {
    return Array.from(Array(to), (_, i) => from + i);
}

export default class DayView extends React.PureComponent {
    constructor(props) {
        super(props);
        // change this for the calendar line height
        const lineHeight = props.lineHeight;
        this.calendarHeight = (props.end - props.start) * lineHeight;
        const width = props.width - LEFT_MARGIN;
        const packedEvents = populateEvents(
            props.events,
            width,
            props.start,
            lineHeight
        );
        let initPosition =
            _.min(_.map(packedEvents, "top")) -
            this.calendarHeight / (props.end - props.start);
        initPosition = 0;
        this.state = {
            _scrollY: initPosition,
            packedEvents,
            lastEvents: props.events,
            lastStart: props.start,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const width = nextProps.width - LEFT_MARGIN;
        if (
            nextProps.events !== prevState.lastEvents ||
            nextProps.start !== prevState.lastStart
        ) {
            return {
                ...prevState,
                packedEvents: populateEvents(
                    nextProps.events,
                    width,
                    nextProps.start,
                    100
                ),
                lastEvents: nextProps.events,
                lastStart: nextProps.start,
            };
        }
        return null;
    }

    // componentWillReceiveProps(nextProps) {
    //   const width = nextProps.width - LEFT_MARGIN;
    //   this.setState({
    //     packedEvents: populateEvents(nextProps.events, width, nextProps.start),
    //   });
    // }

    componentDidMount() {
        this.props.scrollToFirst && this.scrollToFirst();
    }

    scrollToFirst() {
        setTimeout(() => {
            if (this.state && this.state._scrollY && this._scrollView) {
                this._scrollView.scrollTo({
                    x: 0,
                    y: this.state._scrollY,
                    animated: true,
                });
            }
        }, 1);
    }

    _renderLines() {
        const { format24h, start, end } = this.props;
        const offset = this.calendarHeight / (end - start);

        return range(start, end + 1).map((i, index) => {
            let timeText;
            if (i === start) {
                timeText = ``;
            } else if (i < 12) {
                timeText = !format24h ? `${i} AM` : i;
            } else if (i === 12) {
                timeText = !format24h ? `${i} PM` : i;
            } else if (i === 24) {
                timeText = !format24h ? `12 AM` : 0;
            } else {
                timeText = !format24h ? `${i - 12} PM` : i;
            }
            const { width, styles } = this.props;
            return [
                <Text
                    key={`timeLabel${i}`}
                    style={[styles.timeLabel, { top: offset * index - 6 }]}
                >
                    {timeText}
                </Text>,
                i === start ? null : (
                    <View
                        key={`line${i}`}
                        style={[
                            styles.line,
                            { top: offset * index, width: width - 20 },
                        ]}
                    />
                ),
                <View
                    key={`lineHalf${i}`}
                    style={[
                        styles.line,
                        { top: offset * (index + 0.5), width: width - 20 },
                    ]}
                />,
            ];
        });
    }

    _renderTimeLabels() {
        const { styles, start, end } = this.props;
        const offset = this.calendarHeight / (end - start);
        return range(start, end).map((item, i) => {
            return (
                <View
                    key={`line${i}`}
                    style={[styles.line, { top: offset * i }]}
                />
            );
        });
    }

    _onEventTapped(event) {
        // remove the fake Date in event.end and event.start
        // var newEvent = Object.assign({}, event);
        // newEvent.end = event.end.split(" ")[1];
        // newEvent.start = event.start.split(" ")[1];
        this.props.eventTapped({
            ...event,
            end: event.end.split(" ")[1],
            start: event.start.split(" ")[1],
        });
    }

    _renderEvents() {
        const { styles } = this.props;
        const { packedEvents } = this.state;
        let events = packedEvents.map((event, i) => {
            const style = {
                left: event.left,
                height: event.height,
                width: event.width,
                top: event.top,
            };

            const eventColor = {
                backgroundColor: event.color,
            };

            // Fixing the number of lines for the event title makes this calculation easier.
            // However it would make sense to overflow the title to a new line if needed
            const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
            const formatTime = this.props.format24h ? "HH:mm" : "hh:mm A";
            return (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                        this._onEventTapped(this.props.events[event.index])
                    }
                    key={i}
                    style={[styles.event, style, event.color && eventColor]}
                >
                    {this.props.renderEvent ? (
                        this.props.renderEvent(event)
                    ) : (
                        <View>
                            <Text numberOfLines={1} style={styles.eventTitle}>
                                {event.title || "Event"}
                            </Text>
                            {numberOfLines > 1 ? (
                                <Text
                                    numberOfLines={numberOfLines - 1}
                                    style={[styles.eventSummary]}
                                >
                                    {event.summary || " "}
                                </Text>
                            ) : null}
                            {numberOfLines > 2 ? (
                                <Text
                                    style={styles.eventTimes}
                                    numberOfLines={1}
                                >
                                    {moment(event.start).format(formatTime)} -{" "}
                                    {moment(event.end).format(formatTime)}
                                </Text>
                            ) : null}
                        </View>
                    )}
                </TouchableOpacity>
            );
        });

        return (
            <View>
                <View style={{ marginLeft: LEFT_MARGIN }}>{events}</View>
            </View>
        );
    }

    render() {
        const { styles } = this.props;
        return (
            <ScrollView
                ref={(ref) => (this._scrollView = ref)}
                contentContainerStyle={[
                    styles.contentStyle,
                    { width: this.props.width },
                ]}
            >
                {this._renderLines()}
                {this._renderEvents()}
            </ScrollView>
        );
    }
}
