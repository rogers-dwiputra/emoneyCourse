import * as React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function PaySuccessScreen({ navigation, route }){
    const { merchant, nominalBayar } = route.params;

    return (
      <View>
        <Text>Payment Success Rp. {nominalBayar} ke Merchant { merchant.nama_merchant }</Text>
        <Button
        title="Back To Home"
        onPress={() => {
          navigation.navigate('MainBottomTab');
        }}
        />
      </View>
    );
  }