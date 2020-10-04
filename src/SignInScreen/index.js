import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

import {AuthContext} from '../Context'

export default function SignInScreen({navigation}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View
      style={{
        marginHorizontal: 8
      }}
      >
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{
            borderBottomWidth: 1,
            marginBottom: 8
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={{
            borderBottomWidth: 1,
            marginBottom: 8
          }}
          secureTextEntry
        />
        <View
        style={{
          marginBottom: 8
        }}
        >
        <Button title="Sign in" onPress={() => signIn({ username, password })} />
        </View>
        <Button title="Registrasi" style={{ marginTop: 16 }} onPress={() => navigation.navigate('Registrasi')} />
      </View>
    );
  }