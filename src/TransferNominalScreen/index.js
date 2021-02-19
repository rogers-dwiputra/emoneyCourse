import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default function TransferNominalScreen({ navigation }){
    return (
      <View>
        <Text>Transfer Nominal Screen</Text>
        <Button
        title="Transfer Success"
        onPress={() => {
          navigation.navigate('TransferSuccessScreen');
        }}
        />
      </View>
    );
  }