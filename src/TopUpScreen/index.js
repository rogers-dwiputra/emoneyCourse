import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TopUpScreen({ navigation }){

  const [idUser, setIdUser] = useState('');
  const [nominalTopUp, setNominalTopUp] = useState('');
  const [openMidtrans, setOpenMidtrans] = useState(false);
  const [midtransUrl, setMidtransUrl] = useState('');
  const [orderId, setOrderId] = useState('');

    useEffect(() => {
        _getData()
    }, []);

    const _getData = async () => {
      try {
        let id_user = await AsyncStorage.getItem('id_user')
        if(id_user !== null) {
          setIdUser(id_user)
        }
      } catch(e) {
        // error reading value
        console.log(e);
      }
    }
      return (
        <View style={{ flex: 1, paddingHorizontal: 8, marginTop: 16, backgroundColor: '#F4F4F4' }}>
          <View style={{ flex: 1 }}>

          </View>
          <View style={{ flex: 1 }}>
            <TextInput
            placeholder="Nominal Top Up"
            style={{ borderWidth: 1, borderColor: "#8c8c8c", marginBottom: 8, backgroundColor: '#FFFFFF', borderRadius: 4 }}
            onChangeText={inputNominal => { setNominalTopUp(inputNominal) }}
            value={nominalTopUp}
            />
            <View style={{ marginTop: 8 }}>
            <Button
            title="Submit"
            onPress={() => {
              console.log('submitTopUp')
            }}
            />
          </View>
          </View>
        </View>
      );
  }