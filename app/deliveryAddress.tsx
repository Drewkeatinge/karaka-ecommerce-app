import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/CartContext';

const AddressForm = () => {


  const [address, setAddress] = useState({
  name: '',
  street: '',
  suburb: '',
  city: '',
  postalCode: '',
  country: '',
});
  const router = useRouter();

  
  const delAddress = address


  const handleSubmit = () => {
    router.push({
      pathname: '/deliverySummary',
      params: { address: JSON.stringify(address)},
    });
  };

  return (
    <View style={styles.container}>
  <TextInput
    style={styles.input}
    placeholder="Name"
    value={address.name}
    onChangeText={(text) => setAddress({ ...address, name: text })}
  />
  <TextInput
    style={styles.input}
    placeholder="Street"
    value={address.street}
    onChangeText={(text) => setAddress({ ...address, street: text })}
  />
  <TextInput
    style={styles.input}
    placeholder="Suburb"
    value={address.suburb}
    onChangeText={(text) => setAddress({ ...address, suburb: text })}
  />
  <TextInput
    style={styles.input}
    placeholder="City"
    value={address.city}
    onChangeText={(text) => setAddress({ ...address, city: text })}
  />
  <TextInput
    style={styles.input}
    placeholder="Postal   
 Code"
    value={address.postalCode}
    onChangeText={(text) => setAddress({ ...address, postalCode: text   
 })}
    keyboardType="numeric"
  />
  <TextInput
    style={styles.input}
    placeholder="Country"
    value={address.country}
    onChangeText={(text) => setAddress({ ...address, country: text   
 })}
  />
  <Button title="Submit" onPress={handleSubmit} />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddressForm;
