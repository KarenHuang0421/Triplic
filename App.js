import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

//router
import Login from './screen/Login';
import Home  from './screen/Home';
import MyTrips  from './screen/MyTrips';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const Group = () => {
  return(
    <Tab.Navigator  
      tabBarOptions={{
        // showLabel:false,
        tabStyle: {
          backgroundColor: 'transparent'
        },
        style: styles.tabBarStyle
      }}
      >
      <Tab.Screen 
        name="page1" 
        component={Home} />
      <Tab.Screen 
        name="page2" 
        component={MyTrips}/>
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {/* <Stack.Screen name="Open" component={Open} /> */}
        {/* <Stack.Screen name="Loading" component={Loading} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Group" component={Group} />
        {/* <Stack.Screen name="Detail" component={Detail} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#eaebedcc',
    borderTopColor:'white',
    borderTopWidth: 3,
    height: 60
  }
});