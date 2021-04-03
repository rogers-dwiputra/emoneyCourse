import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeTab({ navigation }) {

    const [saldoUser, setSaldoUser] = useState('0');
    const [transaksi, setTransaksi] = useState([]);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        console.log('focus');
        _getData()
      });
  
      return unsubscribe;
    }, []);

    const _getData = async () => {
      try {
        let id_user = await AsyncStorage.getItem('id_user')
        if(id_user !== null) {
          axios.get(`https://emoneydti.basicteknologi.co.id/index.php/api/dashboard?id_user=${id_user}`)
          .then(function (response) {
            // handle success
            console.log(response.data);
            setSaldoUser(response.data.data.saldo);
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
      } catch(e) {
        // error reading value
        console.log(e);
      }
    }

    const renderItem = ({item}) => {
      console.log(item);
      return (
        <View style={{ padding: 8, flex: 1, flexDirection: 'row', backgroundColor: '#FFFFFF', marginBottom: 8, borderRadius: 4 }}>
          <View style={{ width: 50, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}><Text>icon</Text></View>
          <View style={{ flex: 1, position: 'relative' }}>
            <Text style={{ marginBottom: 8 }}>Rp. 80,0000</Text>
            <Text>Transfer ke 082240206862</Text>
            <Text style={{ position: 'absolute', right: 0 }}>20/08/2020</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0'}}>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 8 }}>
          <Text>Saldo Anda :</Text>
          <Text style={{ fontSize: 36 }}>Rp. {saldoUser}</Text>
          </View>
        </View>
        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#4982C1', borderRadius: 8 }}>
            <View>
              <TouchableOpacity onPress={ () => { navigation.navigate('TopUpScreen') } }>
                <View style={{ width: 60, height: 60, backgroundColor: "#FFFFFF", justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="add-outline" size={30} color="#000000" />
                </View>
              </TouchableOpacity>
              <Text style={{ color: "#FFFFFF", textAlign: 'center', marginTop: 4 }}>Top Up</Text>
            </View>
            <View>
              <TouchableOpacity onPress={ () => { navigation.navigate('QrPaymentScreen') } }>
                <View style={{ width: 60, height: 60, backgroundColor: "#FFFFFF" }}></View>
              </TouchableOpacity>
              <Text style={{ color: "#FFFFFF", textAlign: 'center', marginTop: 4 }}>Qr-Pay</Text>
            </View>
            <View>
              <TouchableOpacity onPress={ () => { navigation.navigate('TransferScreen') } }>
                <View style={{ width: 60, height: 60, backgroundColor: "#FFFFFF" }}></View>
              </TouchableOpacity>
              <Text style={{ color: "#FFFFFF", textAlign: 'center', marginTop: 4 }}>Transfer</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, marginHorizontal: 8 }}>
          <Text style={{ marginBottom: 8 }}>5 Transaksi Terakhir :</Text>
          <FlatList
          data={transaksi}
          renderItem={renderItem}
          keyExtractor={item => item.id_transaction}
          />
        </View>
      </View>
    );
  }