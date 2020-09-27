import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeTabScreen({navigation}){

  return (
    <View style={{
      backgroundColor: "#FOFOFO",
      flex: 1
    }}>
      <View style={{
        flex: 1,
        backgroundColor: "#FFFFFF"
      }}>

      </View>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#4982C1",
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 16
      }}>
        <View>
        <TouchableHighlight
        onPress={() => {
          navigation.navigate("TopUp");
        }}
        style={{
          backgroundColor: "#FFFFFF",
          padding: 24
        }}>
        <Ionicons name={'add-outline'} size={24} />
        </TouchableHighlight>
        <Text style={{
          marginTop: 4,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: "#FFFFFF"
        }}>Top Up</Text>
        </View>
        
        <View>
        <TouchableHighlight
        style={{
          backgroundColor: "#FFFFFF",
          padding: 24
        }}
        onPress={() => {
          navigation.navigate("QrPay");
        }}>
        <Ionicons name={'qr-code-outline'} size={24} />
        </TouchableHighlight>
        <Text style={{
          marginTop: 4,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: "#FFFFFF"
        }}>QR Pay</Text>
        </View>

        <View>
        <TouchableHighlight
        style={{
          backgroundColor: "#FFFFFF",
          padding: 24
        }}
        onPress={() => {
          navigation.navigate("Transfer");
        }}>
        <Ionicons name={'send-outline'} size={24} />
        </TouchableHighlight>
        <Text style={{
          marginTop: 4,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: "#FFFFFF"
        }}>Transfer</Text>
        </View>

      </View>

      <View style={{
        flex: 3,
        marginHorizontal: 18
      }}>
      <Text
      style={{
        fontSize: 14
      }}
      >5 Transaksi Terakhir Anda</Text>
      <View
      style={{
        backgroundColor: "#FFFFFF",
        height: 72,
        marginTop: 8,
        borderRadius: 8,
      }}
      >
      <View
      style={{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 8,
      }}
      >
      <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
      <Ionicons name={'trail-sign'} size={24} style={{ textAlign: 'center' }} />
      </View>

      <View
      style={{
        flex: 3,
        justifyContent: 'center'
      }}
      >
      <View>
      <Text>Rp. 80.000</Text>
      </View>
      <Text>Transfer ke 082240206862</Text>
      </View>
      </View>
      </View>
      </View>
    </View>
  );
}

function TopUpScreen(){
  return (
    <View>
      <Text>TopUp Screen</Text>
    </View>
  );
}

function QrPayScreen(){
  return (
    <View>
      <Text>QR Pay Screen</Text>
    </View>
  );
}

function TransferScreen(){
  return (
    <View>
      <Text>Transfer Screen</Text>
    </View>
  );
}

function TransactionTabScreen(){

  return (
    <View>
      <Text>Transaction</Text>
    </View>
  );
}

function AccountTabScreen(){
  const { signOut } = React.useContext(AuthContext);
  return (
    <View
    style={{
      flex: 1
    }}>
      <View
      style={{
        backgroundColor: '#005690',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
      <Ionicons name={'person-circle-outline'} size={24} color={"#FFFFFF"} style={{ fontSize: 100, textAlign: 'center' }} />
      <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 18 }}>R. Rogers Dwiputra Setiady</Text>
      <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 18 }}>082240206862</Text>
      </View>

      <View
      style={{
        flex: 2
      }}>
        <View
        style={{
          marginTop: 8,
          marginHorizontal: 8
        }}
        >
          <Button title="UBAH PROFIL"/>
        </View>
        
        <View
        style={{
          marginTop: 8,
          marginHorizontal: 8
        }}
        >
        <Button title="GANTI PASSWORD"/>
        </View>

        <View
        style={{
          marginTop: 8,
          marginHorizontal: 8
        }}
        >
        <Button title="Sign out" onPress={signOut} />
        </View>
      </View>
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

function RegistrasiScreen() {

  return (
    <View>
      <Text>Registrasi Screen</Text>
    </View>
  );
}

function SignInScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
      <Button title="Registrasi" style={{ marginTop: 16 }} onPress={() => navigation.navigate('Registrasi')} />
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

        try {
          await AsyncStorage.setItem('userToken', 'dummy-auth-token')
        } catch (e) {
          // saving error
          console.log(e);
        }

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
            name="QrPay"
            component={QrPayScreen}
            />
            <Stack.Screen
            name="Transfer"
            component={TransferScreen}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
