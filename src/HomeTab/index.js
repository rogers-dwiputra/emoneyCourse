import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <View style={{ borderWidth: 1, borderColor: "#8c8c8c", paddingTop: 4, paddingBottom: 4, paddingHorizontal: 2, marginBottom: 8 }}>
          <Text>{item.berita_transaksi}</Text>
          <Text>{item.waktu_transaksi}</Text>
          <Text>{item.nominal_transaksi}</Text>
          <Text>{item.jenis_transaksi}</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <Text>HomeTab</Text><Icon style={{ fontSize: 20 }} name="home"/>
        <Text>Saldo Anda : Rp. {saldoUser}</Text>
        <View style={{ marginTop: 16 }}>
        <Button
        title="TopUp"
        onPress={() => {
          navigation.navigate('TopUpScreen');
        }}
        />
        </View>
        <View style={{ marginTop: 16 }}>
        <Button
        title="Qr Pay"
        onPress={() => {
          navigation.navigate('QrPaymentScreen');
        }}
        />
        </View>
        <View style={{ marginTop: 16 }}>
        <Button
        title="Transfer"
        onPress={() => {
          navigation.navigate('TransferScreen');
        }}
        />
        </View>
        <Text>5 Transaksi Terakhir :</Text>
        <FlatList
        data={transaksi}
        renderItem={renderItem}
        keyExtractor={item => item.id_transaction}
        />
      </View>
    );
  }