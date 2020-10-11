import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

export default function TopUpSuccessScreen({ route, navigation }){
    const { orderId } = route.params;

    useEffect(() => {
      getTransInfo();
    }, []);

    const getTransInfo = async () => {
      axios.get('http://103.89.1.214/emoneycourseapi/index.php/api/snap/transactionstatus?order_id='+orderId)
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    return (
      <View>
        <Text>TopUp Success Screen</Text>
      </View>
    );
  }