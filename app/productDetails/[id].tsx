import { useQuery } from "@tanstack/react-query";
import request from "superagent";
import type ProductList from "@/models/Product";
import { Image, Text, View, StyleSheet, Button } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useCart } from '../../CartContext';
import type { CartItem } from '../../models/Cart';

function ProductDetails() {
  const { id } = useLocalSearchParams();

  console.log(id);

  const { addToCart } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await request.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      return response.body as ProductList;
    }
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Something went wrong</Text>;

  // Convert ProductList to CartItem
  const cartItem: CartItem = {
    id: data?.id ?? 0,
    name: data?.title ?? '',
    quantity: 1,
    price: Number(data?.price)
  };

  return (
    <View>
      <Image source={{ uri: data?.images[0] }} style={styles.image} />
      <Text>{data?.title}</Text>
      <Text>{data?.description}</Text>
      <Text>{data?.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(cartItem)} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60
  }
});

export default ProductDetails;
