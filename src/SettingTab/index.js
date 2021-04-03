import * as React from 'react';
import { Button, Text, View } from 'react-native';

import {AuthContext} from '../Context';

export default function SettingTab() {
    const { signOut } = React.useContext(AuthContext);
  
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <View style={{ flex: 1, backgroundColor: '#005690', justifyContent: 'flex-end' }}>
          <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 16 }}>Rogers Dwiputra Setiady</Text>
          <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 16 }}>082240206862</Text>
        </View>
        <View style={{ flex: 2, marginHorizontal: 8, paddingTop: 8 }}>
          <View style={{ marginBottom: 8 }}>
            <Button title="Ubah Profil"/>
          </View>
          <View style={{ marginBottom: 8 }}>
          <Button title="Ganti Profil"/>
          </View>
          <View style={{ marginBottom: 8 }}>
          <Button title="Sign out" onPress={signOut} />
          </View>
        </View>
      </View>
    );
  }