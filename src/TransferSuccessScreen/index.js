import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default function TransferSuccessScreen({ navigation }){
    return (
      <View>
        <Text>Transfer Success Screen</Text>
        <Button
        title="Back to Home"
        onPress={() => {
          navigation.navigate('MainBottomTab');
        }}
        />
      </View>
    );
  }