import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default function TransferScreen({ navigation }){
    return (
      <View>
        <Text>Transfer Screen</Text>
        <Button
        title="Transfer Nominal"
        onPress={() => {
          navigation.navigate('TransferNominalScreen');
        }}
        />
      </View>
    );
  }