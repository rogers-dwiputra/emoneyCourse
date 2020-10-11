import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';
import { WebView } from 'react-native-webview';

export default function TopUpScreen({navigation}){
    const [nominalTopUp, setNominalTopUp] = useState('0');
    const [isMidtrans, setIsMidtrans] = useState(false);
    const [midtransUrl, setMidtransUrl] = useState("");
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
    }, []);

    const submitTopUp = async () => {
      let id_user = await AsyncStorage.getItem('userToken');

      axios({
        method: 'post',
        url: 'http://103.89.1.214/emoneycourseapi/index.php/api/snap/token',
        data: {
          id_user: id_user,
          nominal_topup: nominalTopUp,
        }
      }).then((response) => {
        if(response.data.status == 'true'){
          // navigation.navigate('TopUpSuccess', {
          //   data: response.data.data
          // })
          setMidtransUrl(response.data.data.redirect_url);
          setOrderId(response.data.data.order_id);
          setIsMidtrans(true);
          // console.log(response.data.redirect_url);
        }
        else {
          ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
        }
      });
    }

    if(isMidtrans == true){
      return(
        <WebView
        source={{ uri: midtransUrl }}
        onNavigationStateChange={(navState) => { 
          console.log(navState.url); 
          console.log("Order ID: "+orderId);
          if(navState.url.search("basicteknologi.co.id") > 0)
          { 
            navigation.navigate('TopUpSuccess', {
              orderId: orderId
            });
          } 
        }}
      />
      )
    }
    else {
      return (
        <View>
          <Text>TopUp Screen</Text>
          <TextInput
          placeholder="Nominal Top Up"
          style={{
            borderBottomWidth: 1,
            marginBottom: 8
          }}
          value={nominalTopUp}
          onChangeText={text => setNominalTopUp(text)}
          />
          <Button
          title="Submit"
          onPress={() => ( submitTopUp() )}
          />
        </View>
      );
    }
  }