import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from "react-native";
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function StyleText({ fontSize, color, fontWeight, style, children, numberOfLines }) {
    return (
      <Text
        style={[
          { fontSize: fontSize, color: color, fontWeight: fontWeight },
          style,
        ]}
        numberOfLines={numberOfLines}
      >
        {children}
      </Text>
    );
  }
  
  function Row({ h, v, flex, style, children }) {
    return (
      <View
        style={[
          { flexDirection: "row", justifyContent: h, alignItems: v, flex: flex },
          style,
        ]}
      >
        {children}
      </View>
    );
  }
  
  function Column({ v, h, flex, style, children }) {
    return (
      <View style={[{ justifyContent: v, alignItems: h, flex: flex }, style]}>
        {children}
      </View>
    );
  }

  function BlueBtn({title, onPress, style}){
    return(
      <TouchableOpacity 
        style={[styles.blueBtn, style]}
        onPress={onPress}
      >
        <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
      </TouchableOpacity>
    )
  }
  function WhiteBtn({title, onPress, style}){
    return(
      <TouchableOpacity 
        style={[styles.whiteBtn, style]}
        onPress={onPress}
      >
        <Text style={{color: '#00528FB2', fontSize: 20}}>{title}</Text>
      </TouchableOpacity>
    )
  }
  function DisableBtn({title, style}){
    return(
      <Column 
        style={[styles.disableBtn, style]}
      >
        <Text style={{color: '#bdbdbd', fontSize: 20}}>{title}</Text>
      </Column>
    )
  }
  function BorderBtn({title, onPress,style, borderRadius}){
    return (
      <TouchableOpacity 
        style={[styles.borderBtn, style , {borderRadius: borderRadius?borderRadius:20}]}
        onPress={onPress}
      >
        <Text style={{color: '#00528F', fontSize: 20}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  const styles = StyleSheet.create({
    blueBtn: {
      borderRadius:20,
      backgroundColor: "#00528FB2",
      paddingVertical:3,
      paddingHorizontal: 20
    },
    disableBtn: {
      borderRadius:20,
      backgroundColor: "#e0e0e0",
      paddingVertical:3,
      paddingHorizontal: 20
    },
    borderBtn: {
      width:200,
      textAlign:'center',
      alignItems: 'center',
      borderColor: "#00528F",
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: "transparent",
      paddingVertical:20,
      margin:50
    },
    whiteBtn: {
      borderRadius:20,
      borderColor: "#00528FB2",
      borderWidth: 1,
      backgroundColor: "white",
      paddingVertical:3,
      paddingHorizontal: 20
    }
  });
  
  export {
    StyleText,
    Row,
    Column,
    BlueBtn,
    BorderBtn,
    DisableBtn,
    WhiteBtn
  };