import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

export default function TopUpScreen({navigation}){
    const [nominalTopUp, setNominalTopUp] = useState(0);

    useEffect(() => {
    }, []);

    const submitTopUp = async () => {
      let id_user = await AsyncStorage.getItem('userToken');

      axios({
        method: 'post',
        url: 'http://103.89.1.214/emoneycourseapi/index.php/api/topup',
        data: {
          id_user: id_user,
          nominal_topup: nominalTopUp
        }
      }).then((response) => {
        console.log(response);
        if(response.data.status == 'true'){
          navigation.navigate('TopUpSuccess', {
            data: response.data.data
          })
        }
        else {
          ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
        }
      });
    }

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