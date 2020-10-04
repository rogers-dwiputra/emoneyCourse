import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

export default function PaymentKonfirmasiScreen({ route, navigation }){
    const { data } = route.params;

    return (
      <View
      style={{
          marginHorizontal: 8
      }}
      >
        <TextInput
        placeholder="Nominal Pembayaran"
        style={{
            borderBottomWidth: 1,
            marginBottom: 8
        }}
        />
        <Text>Nama Merchant : {data.nama_merchant}</Text>
        <Text>Alamat Merchant : {data.alamat_merchant}</Text>
      </View>
    );
  }