import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

export default function HomeTabScreen({navigation}){

    const [saldo, setSaldo] = useState(0);
    const [transaksi, setTransaksi] = useState();
  
    useEffect(() => {
      getDashboardData()
    }, []);
  
    const getDashboardData = async () => {
      let id_user = await AsyncStorage.getItem('userToken');
      // console.log("ID User: "+id_user);
      axios.get('http://103.89.1.214/emoneycourseapi/index.php/api/dashboard?id_user='+id_user)
      .then(function (response) {
        // handle success
        console.log(response);
        setSaldo(response.data.data.saldo);
        setTransaksi(response.data.data.transaksi);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }
  
    const renderItem = (item) => {
      console.log(item.item.berita_transaksi);
      return (
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
      );
    }
  
    return (
      <View style={{
        backgroundColor: "#FOFOFO",
        flex: 1
      }}>
        <View style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-end"
        }}>
        <Text>Saldo Anda:</Text>
        <Text>Rp. {saldo}</Text>
        </View>
  
        <View style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: "#4982C1",
          justifyContent: 'space-around',
          alignItems: 'center',
          marginHorizontal: 16,
          marginTop: 16,
          marginBottom: 16
        }}>
          <View>
          <TouchableHighlight
          onPress={() => {
            navigation.navigate("TopUp");
          }}
          style={{
            backgroundColor: "#FFFFFF",
            padding: 24
          }}>
          <Ionicons name={'add-outline'} size={24} />
          </TouchableHighlight>
          <Text style={{
            marginTop: 4,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 'bold',
            color: "#FFFFFF"
          }}>Top Up</Text>
          </View>
          
          <View>
          <TouchableHighlight
          style={{
            backgroundColor: "#FFFFFF",
            padding: 24
          }}
          onPress={() => {
            navigation.navigate("QrPay");
          }}>
          <Ionicons name={'qr-code-outline'} size={24} />
          </TouchableHighlight>
          <Text style={{
            marginTop: 4,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 'bold',
            color: "#FFFFFF"
          }}>QR Pay</Text>
          </View>
  
          <View>
          <TouchableHighlight
          style={{
            backgroundColor: "#FFFFFF",
            padding: 24
          }}
          onPress={() => {
            navigation.navigate("Transfer");
          }}>
          <Ionicons name={'send-outline'} size={24} />
          </TouchableHighlight>
          <Text style={{
            marginTop: 4,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 'bold',
            color: "#FFFFFF"
          }}>Transfer</Text>
          </View>
  
        </View>
  
        <View style={{
          flex: 3,
          marginHorizontal: 18
        }}>
        <Text
        style={{
          fontSize: 14
        }}
        >5 Transaksi Terakhir Anda</Text>
  
        
          <FlatList
            data={transaksi}
            renderItem={renderItem}
            keyExtractor={item => item.id_transaction}
          />
        </View>
      </View>
    );
  }