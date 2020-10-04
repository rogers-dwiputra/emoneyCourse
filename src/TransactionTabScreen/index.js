import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

export default function TransactionTabScreen({navigation}){

    const [transaksi, setTransaksi] = useState();
    const [isRefresh, setIsRefresh] = useState(false);
  
    useEffect(() => {
      getTransactionApi();
    }, []);
  
    const getTransactionApi = async () => {
      setIsRefresh(true);
      let id_user = await AsyncStorage.getItem('userToken');
      // console.log("ID User: "+id_user);
      axios.get('http://103.89.1.214/emoneycourseapi/index.php/api/transaction?id_user='+id_user)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setTransaksi(response.data.data);
        setIsRefresh(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setIsRefresh(false);
      })
      .then(function () {
        // always executed
        setIsRefresh(false);
      });
    }
  
    const renderItem = (item) => {
      console.log(item.item.berita_transaksi);
      return (
        <TouchableNativeFeedback
        onPress={() => {
          console.log(item.item);
          navigation.navigate('TransaksiDetail', {
            data: item.item
          });
        }}
        >
        <View
        style={{
          backgroundColor: "#FFFFFF",
          height: 72,
          marginTop: 8,
          borderRadius: 8,
        }}
        >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 8,
          }}
          >
          <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
          <Ionicons name={'trail-sign'} size={24} style={{ textAlign: 'center' }} />
          </View>
  
          <View
          style={{
            flex: 3,
            justifyContent: 'center'
          }}
          >
          <View>
          <Text>Rp. {item.item.nominal_transaksi}</Text>
          </View>
          <Text>{item.item.berita_transaksi}</Text>
          </View>
        </View>
        </View>
        </TouchableNativeFeedback>
      );
    }
  
    return (
      <View>
        <FlatList
          refreshing={isRefresh} 
          data={transaksi}
          renderItem={renderItem}
          keyExtractor={item => item.id_transaction}
          onRefresh={() => { getTransactionApi() }}
        />
      </View>
    );
  }