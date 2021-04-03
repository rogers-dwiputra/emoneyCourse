import * as React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';

import {AuthContext} from './src/Context';
import HomeTab from './src/HomeTab';
import TransactionTab from './src/TransactionTab'
import SettingTab from './src/SettingTab'
import KonfirmasiBayarScreen from './src/KonfirmasiBayarScreen'
import PaySuccessScreen from './src/PaySuccessScreen'
import QrPaymentScreen from './src/QrPaymentScreen'
import RegistrationScreen from './src/RegistrationScreen'
import SignInScreen from './src/SignInScreen'
import SplashScreen from './src/SplashScreen'
import TopUpScreen from './src/TopUpScreen'
import TopUpSuccessScreen from './src/TopUpSuccessScreen'
import TransferNominalScreen from './src/TransferNominalScreen'
import TransferScreen from './src/TransferScreen'
import TransferSuccessScreen from './src/TransferSuccessScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
 
const Tab = createBottomTabNavigator();

function MainBottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeTab} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={20} />
        ),
      }}/>
      <Tab.Screen name="TransactionTab" component={TransactionTab} />
      <Tab.Screen name="SettingTab" component={SettingTab} />
    </Tab.Navigator>
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
        userToken = await AsyncStorage.getItem('token');
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

        axios.post('https://emoneydti.basicteknologi.co.id/index.php/api/users/login', {
          email: data.email,
          password: data.password,
        })
        .then(function (response) {
          console.log(response.data);
          if(response.data.status == 'true'){
            //login berhasil
            Alert.alert(
              "Alert",
              response.data.msg,
              [
                { text: "OK", onPress: async () => {
                  try {
                    await AsyncStorage.setItem('id_user', response.data.data.id_user)
                    await AsyncStorage.setItem('email_user', response.data.data.email_user)
                    await AsyncStorage.setItem('nama_user', response.data.data.nama_user)
                    await AsyncStorage.setItem('nomor_handphone', response.data.data.nomor_handphone)
                    await AsyncStorage.setItem('token', 'dummy-auth-token')
                    dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                  } catch (e) {
                    // saving error
                  }
                }}
              ],
              { cancelable: false }
            );
          }
          else {
            //login gagal
            Alert.alert(
              "Alert",
              response.data.msg,
              [
                { text: "OK", onPress: async () => {}}
              ],
              { cancelable: false }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      signOut: async () => { 
        try {
          await AsyncStorage.setItem('token', '')
          dispatch({ type: 'SIGN_OUT' })
        } catch (e) {
          // saving error
        }
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
                title: 'Sign in',
            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
            </>
          ) : (
            // User is signed in
            <>
            <Stack.Screen 
            name="MainBottomTab" 
            component={MainBottomTab} 
            options={{
              headerShown: false
            }}
            />
            <Stack.Screen
            name="TopUpScreen"
            component={TopUpScreen}
            />
            <Stack.Screen
            name="TopUpSuccessScreen"
            component={TopUpSuccessScreen}
            />
            <Stack.Screen
            name="QrPaymentScreen"
            component={QrPaymentScreen}
            />
            <Stack.Screen
            name="KonfirmasiBayarScreen"
            component={KonfirmasiBayarScreen}
            />
            <Stack.Screen
            name="PaySuccessScreen"
            component={PaySuccessScreen}
            />
            <Stack.Screen
            name="TransferScreen"
            component={TransferScreen}
            />
            <Stack.Screen
            name="TransferNominalScreen"
            component={TransferNominalScreen}
            />
            <Stack.Screen
            name="TransferSuccessScreen"
            component={TransferSuccessScreen}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}