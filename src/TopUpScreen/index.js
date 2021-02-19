import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { WebView } from 'react-native-webview';

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

    const _submitTopUp = () => {
      axios.post('https://emoneydti.basicteknologi.co.id/index.php/api/snap/token', {
        id_user: idUser,
        nominal_topup: nominalTopUp
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data.status == 'true'){
          //buka webview midtrans
          console.log(response.data.data.order_id);
          setOrderId(response.data.data.order_id);
          setMidtransUrl(response.data.data.redirect_url);
          setOpenMidtrans(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    if(openMidtrans){
      return (
        <WebView
        source={{ uri: midtransUrl }}
        onNavigationStateChange={(navState) => {
          // console.log(navState.url);
          if(navState.url.search("basicteknologi.co.id") > 0){
            console.log(orderId);
            navigation.navigate('TopUpSuccessScreen', {
              orderId: orderId
            })
          }
        }}
      />
      );
    }
    else {
      return (
        <View style={{ flex: 1, paddingHorizontal: 8, marginTop: 16 }}>
          <Text>Top Up Screen</Text>
          <TextInput
          placeholder="Nominal Topup"
          style={{ borderWidth: 1, borderColor: "#8c8c8c", marginBottom: 8 }}
          onChangeText={inputNominal => { setNominalTopUp(inputNominal) }}
          value={nominalTopUp}
          />
          <View style={{ marginTop: 8 }}>
          <Button
          title="Submit"
          onPress={() => {
            _submitTopUp()
          }}
          />
          </View>
        </View>
      );
    }
  }