import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

export default function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }