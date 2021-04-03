import * as React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function PaySuccessScreen({ navigation, route }){
    // const { merchant, nominalBayar } = route.params;

    return (
      <View style={{ paddingHorizontal: 8, marginTop: 16, flex: 1 }}>
        <View style={{ flex: 1 }}>

        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ textAlign: 'center', fontSize: 24, marginBottom: 8 }}>Pembayaran Berhasil!</Text>
          <Text style={{ textAlign: 'center', fontSize: 24, marginBottom: 8 }}>Rp. 60,000</Text>
          <View style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 16, paddingBottom: 16, backgroundColor: '#4982C1' }}>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>20 Agustus 2020</Text>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 8, fontWeight: 'bold' }}>Basicschool</Text>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>Jl. Ciparay No 20B, Kota Bandung</Text>
          </View>
          
          <View style={{ marginTop: 16 }}>
          <Button
          title="SELESAI"
          onPress={() => {
            navigation.navigate('MainBottomTab')
          }}
          />
          </View>
        </View>
      
      </View>
    );
  }