import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function RegistrationScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');
    const [nomorHandphone, setNomorHandphone] = useState('');

    const _submitRegistrasi = () => {
      axios.post('https://emoneydti.basicteknologi.co.id/index.php/api/users/registrasi', {
        email: email,
        password: password,
        nama: nama,
        nomor_handphone: nomorHandphone
      })
      .then(function (response) {
        console.log(response.data);
        Alert.alert(
          "Alert",
          response.data.msg,
          [
            { text: "OK", onPress: () => navigation.navigate('SignIn') }
          ],
          { cancelable: false }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 8, marginTop: 16 }}>
        <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, borderColor: "#C3C3C3", marginBottom: 8, borderRadius: 4 }}
        onChangeText={inputEmail => { setEmail(inputEmail) }}
        />
        <TextInput
        placeholder="Password"
        style={{ borderWidth: 1, borderColor: "#C3C3C3", marginBottom: 8, borderRadius: 4 }}
        onChangeText={inputPassword => { setPassword(inputPassword) }}
        />
        <TextInput
        placeholder="Nama"
        style={{ borderWidth: 1, borderColor: "#C3C3C3", marginBottom: 8, borderRadius: 4 }}
        onChangeText={inputNama => { setNama(inputNama) }}
        />
        <TextInput
        placeholder="Nomor Handphone"
        style={{ borderWidth: 1, borderColor: "#C3C3C3", marginBottom: 8, borderRadius: 4 }}
        onChangeText={inputNomorHandphone => { setNomorHandphone(inputNomorHandphone) }}
        />
        <View style={{ marginTop: 8 }}>
          <Button
          onPress={() => { _submitRegistrasi() }}
          title="Submit"
          />
        </View>
      </View>
    );
  }