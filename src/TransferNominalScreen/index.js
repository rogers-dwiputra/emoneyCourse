import * as React from 'react';
import { Button, Text, View, TextInput } from 'react-native';

export default function TransferNominalScreen({ navigation }){
    return (
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        <View style={{ flex: 1 }}>

        </View>
        <View style={{ flex: 2 }}>
          <TextInput
          style={{ borderWidth: 1, borderColor: '#C3C3C3', marginBottom: 8, borderRadius: 4 }}
          placeholder="Nominal Transfer"
          />
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 8 }}>Penerima :</Text>
          <Text style={{ textAlign: 'center', marginBottom: 8 }}>Dendy Aditya</Text>
          <Button
          title="Transfer"
          onPress={() => {
            navigation.navigate('TransferSuccessScreen');
          }}
          />
        </View>
      </View>
    );
  }