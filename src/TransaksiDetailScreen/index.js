import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function TransaksiDetailScreen({ route, navigation }) {
    const { data } = route.params;

    return (
      <View
      style={{
        flex: 1,
        marginHorizontal: 8
      }}
      >
        <Text style={{ marginBottom: 8 }}>Informasi Detail Transaksi</Text>
        <Text style={{ marginBottom: 8 }}>Waktu Transaksi : { data.waktu_transaksi }</Text>
        <Text style={{ marginBottom: 8 }}>Nominal Transaksi : { data.nominal_transaksi }</Text>
        <Text style={{ marginBottom: 8 }}>Berita Transaksi : { data.berita_transaksi }</Text>
        <Text style={{ marginBottom: 8 }}>Jenis Transaksi : { data.jenis_transaksi }</Text>
        <View
        style={{
          width: '100%',
          height: 500
        }}
        >
        <MapView
          style={{
            width: '100%',
            height: 500
          }}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
        </View>
      </View>
    );
  }