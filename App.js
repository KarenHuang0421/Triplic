import React from "react";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Row, StyleText } from "./component/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//router
import Login from "./screen/Login";
import Loading from "./screen/Loading";
import Home from "./screen/Home";
import MyTrips from "./screen/MyTrips";
import Profile from "./screen/Profile";
import TimelineView from "./screen/TimelineScreen";
import PlacesGroup from "./screen/PlacesGroup";
import Place from "./screen/Place";
import Schedule from "./screen/Schedule";
import { Column } from "./component/components";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Group = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="page1" component={Home} />
            <Tab.Screen name="page2" component={MyTrips} />
            <Tab.Screen name="page3" component={Profile} />
        </Tab.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Open" component={Open} /> */}
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={() => ({
                        animationEnabled: false,
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name="Group"
                    component={Group}
                    options={() => ({
                        animationEnabled: false,
                        headerShown: false,
                        // showLabel:false,
                        tabStyle: {
                            backgroundColor: "transparent",
                        },
                        style: styles.tabBarStyle,
                    })}
                />
                <Stack.Screen
                    name="TimelineScreen"
                    component={TimelineView}
                    options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                    name="PlacesGroup"
                    component={PlacesGroup}
                    options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                    name="Place"
                    component={Place}
                    options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                    name="Schedule"
                    component={Schedule}
                    options={({ route }) => ({ title: route.params.name })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: "absolute",
        backgroundColor: "#eaebedcc",
        borderTopColor: "white",
        borderTopWidth: 3,
        height: 60,
    },
});
