import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';

export default function TopUpSuccessScreen({ navigation, route }){
    const { orderId } = route.params;

    const [transactionStatus, setTransactionStatus] = useState({});

    React.useEffect(() => {
      _getTransactionStatus();
    })

    const _getTransactionStatus = () => {
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
      <View>
        <Text>Nominal: {transactionStatus.nominal_topup}</Text>
        <Text>Transaction Time: {transactionStatus.transaction_time}</Text>
        <Text>Bank: {transactionStatus.bank}</Text>
        <Text>VA Number: {transactionStatus.va_number}</Text>
        <Button
        title="Back to Home"
        onPress={() => {
          navigation.navigate('MainBottomTab');
        }}
        />
      </View>
    );
  }