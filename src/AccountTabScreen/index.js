import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';
import {AuthContext} from '../Context'

export default function AccountTabScreen(){
    const { signOut } = React.useContext(AuthContext);

    const [nama, setNama] = useState('');
    const [nomorHandphone, setNomorHandphone] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const namaUser = await AsyncStorage.getItem('nama');
        const nomorHandphoneUser = await AsyncStorage.getItem('nomorHandphone');

        setNama(namaUser)
        setNomorHandphone(nomorHandphoneUser)
    }

    return (
      <View
      style={{
        flex: 1
      }}>
        <View
        style={{
          backgroundColor: '#005690',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
        <Ionicons name={'person-circle-outline'} size={24} color={"#FFFFFF"} style={{ fontSize: 100, textAlign: 'center' }} />
    <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 18 }}>{ nama }</Text>
    <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 18 }}>{ nomorHandphone }</Text>
        </View>
  
        <View
        style={{
          flex: 2
        }}>
          <View
          style={{
            marginTop: 8,
            marginHorizontal: 8
          }}
          >
            <Button title="UBAH PROFIL"/>
          </View>
          
          <View
          style={{
            marginTop: 8,
            marginHorizontal: 8
          }}
          >
          <Button title="GANTI PASSWORD"/>
          </View>
  
          <View
          style={{
            marginTop: 8,
            marginHorizontal: 8
          }}
          >
          <Button title="Sign out" onPress={signOut} />
          </View>
        </View>
      </View>
    );
  }