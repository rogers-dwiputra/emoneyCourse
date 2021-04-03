import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function TransferScreen({ navigation }){
    return (
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        <View style={{ flex: 1 }}>

        </View>
        <View style={{ flex: 2 }}>
          <TextInput
          style={{ borderWidth: 1, borderColor: '#C3C3C3', marginBottom: 8, borderRadius: 4 }}
          placeholder="Nomor Handphone Penerima"
          />
          <Button
          title="Periksa Nomor"
          onPress={() => {
            navigation.navigate('TransferNominalScreen');
          }}
          />
        </View>
      </View>
    );
  }