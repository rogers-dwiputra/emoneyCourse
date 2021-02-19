import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default function QrPaymentScreen({ navigation }){
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          captureAudio={false}
          style={{ flex: 1 }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            if(barcodes[0].type == 'QR_CODE'){
              console.log(barcodes[0].data);
              navigation.navigate('KonfirmasiBayarScreen', {
                qrdata: barcodes[0].data
              });
            }
          }}
        />
      </View>
    );
  }