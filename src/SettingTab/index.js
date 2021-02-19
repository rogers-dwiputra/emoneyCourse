import * as React from 'react';
import { Button, Text, View } from 'react-native';

import {AuthContext} from '../Context';

export default function SettingTab() {
    const { signOut } = React.useContext(AuthContext);
  
    return (
      <View>
        <Text>SettingTab</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
    );
  }