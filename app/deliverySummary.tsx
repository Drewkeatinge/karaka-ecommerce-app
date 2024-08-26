import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCart } from '@/CartContext';

const DeliverySummaryScreen = () => {
  
  const { address: addressParam } = useLocalSearchParams();

  const { items: cartItems } = useCart();

  const address = addressParam ? JSON.parse(addressParam as string) : {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Address:</Text>
      <Text>Name: {address.name}</Text>
      <Text>Street: {address.street}</Text>
      <Text>Suburb: {address.suburb}</Text>
      <Text>City: {address.city}</Text>
      <Text>Postal Code: {address.postalCode}</Text>
      <Text>Country: {address.country}</Text>

      <Text style={styles.title}>Cart Items:</Text>
      {cartItems.map((item: any, index: number) => (
        <Text key={index}>{item.name} - {item.quantity}</Text>
      ))}

      {/* Add a button for payment or any other component */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DeliverySummaryScreen;
