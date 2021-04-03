import React, { useEffect } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function KonfirmasiBayarScreen({ navigation, route }){
    // const { qrdata } = route.params;

    const [merchant, setMerchant] = useState({});
    const [nominalBayar, setNominalBayar] = useState(0);
    const [idUser, setIdUser] = useState();

    useEffect(() => {
      _getMerchant();
      _getData();
    }, []);

    const _getData = async () => {
      try {
        let id_user = await AsyncStorage.getItem('id_user')
        if(id_user !== null) {
          setIdUser(id_user);
        }
      } catch(e) {
        // error reading value
        console.log(e);
      }
    }

    const _getMerchant = () => {
      let qrdata = '723969a7d4b04ab96757bad464de6aec';
      axios.get(`https://emoneydti.basicteknologi.co.id/index.php/api/merchant/?kode_merchant=${qrdata}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setMerchant(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    const _postBayar = () => {
      axios.post('https://emoneydti.basicteknologi.co.id/index.php/api/merchant/pay', {
        id_merchant: merchant.id_merchant,
        nominal_bayar: nominalBayar,
        id_user : idUser
      })
      .then(function (response) {
        console.log(response);
        if(response.data.status == 'true'){
          navigation.navigate('PaySuccessScreen', {
            merchant: merchant,
            nominalBayar: nominalBayar
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <View style={{ paddingHorizontal: 8, marginTop: 16, flex: 1 }}>
        <View style={{ flex: 1 }}>

        </View>
        <View style={{ flex: 1 }}>
          <TextInput
          placeholder="Nominal Bayar"
          style={{ borderBottomWidth: 1, borderColor: "#8c8c8c", marginBottom: 8 }}
          onChangeText={inputNominal => { setNominalBayar(inputNominal) }}
          defaultValue={nominalBayar}
          />
          <View style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 16, paddingBottom: 16, backgroundColor: '#4982C1' }}>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>Pembayaran Kepada :</Text>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 8, fontWeight: 'bold' }}>{merchant.nama_merchant}</Text>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>{merchant.alamat_merchant}</Text>
          </View>
          
          <View style={{ marginTop: 16 }}>
          <Button
          title="Bayar"
          onPress={() => {
            _postBayar();
          }}
          />
          </View>
        </View>
      
      </View>
    );
  }