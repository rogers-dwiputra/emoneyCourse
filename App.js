import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, ToastAndroid, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

import {AuthContext} from './src/Context'
import HomeTabScreen from './src/HomeTabScreen'
import SplashScreen from './src/SplashScreen'
import TopUpScreen from './src/TopUpScreen'
import QrPayScreen from './src/QrPayScreen'
import TransactionTabScreen from './src/TransactionTabScreen'
import AccountTabScreen from './src/AccountTabScreen'
import SignInScreen from './src/SignInScreen'
import TopUpSuccessScreen from './src/TopUpSuccessScreen'
import PaymentKonfirmasiScreen from './src/PaymentKonfirmasiScreen';
import TransaksiDetailScreen from './src/TransaksiDetailScreen';

function TransferScreen(){
  const [nomorHandphone, setNomorHandphone] = useState('');
  const [dataPenerima, setDataPenerima] = useState(null);
  const [nominalTransfer, setNominalTransfer] = useState(0);

  const apiCekNomorHandphone = () => {
    // console.log(nomorHandphone)
    axios.get('http://103.89.1.214/emoneycourseapi/index.php/api/transfer/checknumber?nomor_handphone='+nomorHandphone)
    .then(function (response) {
      // handle success
      console.log(response.data);
      if(response.data.status == "true"){
        // console.log(response.data.data);
        setDataPenerima(response.data.data)
      }
      else {
        setDataPenerima(null)
      }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setDataPenerima(null)
    })
    .then(function () {
      // always executed
    });
  }

  const apiTransfer = () => {
    //fungsi post transfer
    //setelah transfer success, redirect ke halaman transfer success
    console.log(nominalTransfer);
  }

  return (
    <View
    style={{
      marginHorizontal: 8
    }}
    >
      <TextInput
      placeholder="Nomor Handphone Tujuan"
      onChangeText={(text) => { setNomorHandphone(text) }}
      style={{
        borderBottomWidth: 1,
        marginBottom: 8
      }}
      value={nomorHandphone}
      />
      {
        dataPenerima == null &&
        <Button
        title="Cek Nomor Handphone"
        onPress={() => { apiCekNomorHandphone() }}
        />
      }

      {
        dataPenerima != null &&
        <>
        <Text style={{ marginBottom: 8 }}>Nama Penerima: { dataPenerima[0].nama_user }</Text>
        <TextInput
        placeholder="Nominal Transfer"
        onChangeText={(text) => { setNominalTransfer(text) }}
        style={{
          borderBottomWidth: 1,
          marginBottom: 8
        }}
        value={nominalTransfer}
        />
        <Button
        title="Transfer"
        onPress={() => { apiTransfer() }}
        />
        </>
      }
      
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabScreen() {
  return (
      <Tab.Navigator>
        <Tab.Screen 
        name="HomeTab" 
        component={HomeTabScreen}
        options={{
          title : "Home",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'home' : 'home-outline';
            
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }}
        />
        <Tab.Screen 
        name="TransactionTab" 
        component={TransactionTabScreen} 
        options={{
          title : "Transaction",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'trail-sign' : 'trail-sign-outline';
            
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }}
        />
        <Tab.Screen 
        name="AccountTab" 
        component={AccountTabScreen} 
        options={{
          title : "Account",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'person' : 'person-outline';
            
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }}
        />
      </Tab.Navigator>
  );
}

function RegistrasiScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [nomorHandphone, setNomorHandphone] = useState("");

  useEffect(() => {
    
  });

  const submitRegistrasi = async () => {
    // console.log(email+" "+password+" "+nama+" "+nomorHandphone);
    axios.post('http://103.89.1.214/emoneycourseapi/index.php/api/users/registrasi', {
      email: email,
      password: password,
      nama: nama,
      nomor_handphone: nomorHandphone
    })
    .then(function (response) {
      if(response.data.status == "true"){
        navigation.navigate('SignIn');
      }
      else {
        ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <View
    style={{
      marginHorizontal: 8
    }}
    >
      <TextInput
      placeholder="Email"
      style={{
        borderBottomWidth: 1,
        marginBottom: 8
      }}
      onChangeText={text => setEmail(text)}
      value={email}
      />
      <TextInput
      placeholder="Password"
      style={{
        borderBottomWidth: 1,
        marginBottom: 8
      }}
      onChangeText={text => setPassword(text)}
      value={password}
      />
      <TextInput
      placeholder="Nama"
      style={{
        borderBottomWidth: 1,
        marginBottom: 8
      }}
      onChangeText={text => setNama(text)}
      value={nama}
      />
      <TextInput
      placeholder="No Handphone"
      style={{
        borderBottomWidth: 1,
        marginBottom: 8
      }}
      onChangeText={text => setNomorHandphone(text)}
      value={nomorHandphone}
      />
      <Button
      title="Submit"
      onPress={() => { submitRegistrasi() }}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log(data);
        axios.post('http://103.89.1.214/emoneycourseapi/index.php/api/users/login', {
          email: data.username,
          password: data.password
        })
        .then( async (response) => {
          // console.log(response.data);
          if(response.data.status == 'true'){
            try {
              await AsyncStorage.setItem('userToken', response.data.data.id_user)
              await AsyncStorage.setItem('email', response.data.data.email_user)
              await AsyncStorage.setItem('nama', response.data.data.nama_user)
              await AsyncStorage.setItem('nomorHandphone', response.data.data.nomor_handphone)

              dispatch({ type: 'SIGN_IN', token: response.data.data.id_user });
            } catch (e) {
              // saving error
              console.log(e);
            }
          }
          else {
            ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken')
        } catch (e) {
          // saving error
          console.log(e);
        }
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name="Registrasi"
              component={RegistrasiScreen}
              options={{
                title: 'Registrasi',
              }}
            />
            </>
          ) : (
            <>
            <Stack.Screen
            name="MainTab"
            component={MainTabScreen}
            options={{
              headerShown: false
            }} 
            />
            <Stack.Screen
            name="TopUp"
            component={TopUpScreen}
            />
            <Stack.Screen
            name="TopUpSuccess"
            component={TopUpSuccessScreen}
            />
            <Stack.Screen
            name="QrPay"
            component={QrPayScreen}
            />
            <Stack.Screen
            name="PaymentKonfirmasi"
            component={PaymentKonfirmasiScreen}
            />
            <Stack.Screen
            name="Transfer"
            component={TransferScreen}
            />
            <Stack.Screen
            name="TransaksiDetail"
            component={TransaksiDetailScreen}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
