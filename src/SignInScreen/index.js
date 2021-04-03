import * as React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {AuthContext} from '../Context';

export default function SignInScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ textAlign: 'center', marginBottom: 8, fontSize: 24, color: '#4982C1' }}>E-Money</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderColor: '#C3C3C3',
              borderWidth: 1,
              borderRadius: 4,
              marginBottom: 8
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderColor: '#C3C3C3',
              borderWidth: 1,
              borderRadius: 4,
              marginBottom: 8
            }}
          />
          <Button title="Login" onPress={() => signIn({ email, password })} />
          <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { navigation.navigate('Registration') }}>
            <Text style={{ textAlign: 'center' }}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }