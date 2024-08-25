import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useCart } from '../../CartContext'

const CartScreen: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();

  const renderItem = ({ item }: { item: { id: number; name: string; price: number; quantity: number } }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: ${item.price * item.quantity}</Text>
      <Button title="Remove" onPress={() => removeFromCart(item.id)} />
      <Button title="Increase" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
      <Button title="Decrease" onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Text>Total: ${items.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0)}</Text>
    </View>
  );
};

export default CartScreen;
