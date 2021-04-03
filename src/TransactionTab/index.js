import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TransactionTab({ navigation }) {
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
          axios.get(`https://emoneydti.basicteknologi.co.id/index.php/api/transaction?id_user=${id_user}`)
          .then(function (response) {
            // handle success
            console.log(response.data);
            setTransaksi(response.data.data);
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
      <View style={{ flex: 3, marginHorizontal: 8, marginTop: 8 }}>
          <FlatList
          data={transaksi}
          renderItem={renderItem}
          keyExtractor={item => item.id_transaction}
          />
      </View>
    );
  }