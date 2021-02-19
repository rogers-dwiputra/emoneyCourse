import * as React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {AuthContext} from '../Context';

export default function SignInScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={() => signIn({ email, password })} />
        <TouchableOpacity style={{ marginTop: 8 }} onPress={() => { navigation.navigate('Registration') }}>
          <Text style={{ textAlign: 'center' }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }