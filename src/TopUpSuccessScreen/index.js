import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';

export default function TopUpSuccessScreen({ navigation, route }){
    // const { orderId } = route.params;

    const [transactionStatus, setTransactionStatus] = useState({});

    React.useEffect(() => {
      _getTransactionStatus();
    })

    const _getTransactionStatus = () => {
      let orderId = 1617465434;
      axios.get(`https://emoneydti.basicteknologi.co.id/index.php/api/snap/transactionstatus?order_id=${orderId}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setTransactionStatus(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    return (
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        <View style={{ flex: 1 }}>

        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ textAlign: 'center', fontSize: 24, marginBottom: 8, textTransform: 'capitalize' }}>Top Up {transactionStatus.transaction_status}</Text>
          <Text style={{ textAlign: 'center', fontSize: 24, marginBottom: 8 }}>Rp. 60,000</Text>
          <View style={{ paddingLeft: 4, paddingRight: 4, paddingTop: 16, paddingBottom: 16, backgroundColor: '#4982C1', marginBottom: 8 }}>
            <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{transactionStatus.transaction_time}</Text>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', textTransform: 'uppercase' }}>{transactionStatus.bank}</Text>
            <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>VA Number: {transactionStatus.va_number}</Text>
          </View>
          <Button
          title="Back to Home"
          onPress={() => {
            navigation.navigate('MainBottomTab');
          }}
          />
        </View>
      </View>
    );
  }