import { useQuery } from "@tanstack/react-query";
import request from "superagent";
import type { ProductList } from "@/models/Product";
import { Image, Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';

function ProductDetails() {
  const {id} = useLocalSearchParams()

  console.log(id)



  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await request.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      // console.log('this is the response', response.body)
      return response.body as ProductList
    }
  })

  if (isLoading) return <Text>Loading...</Text>
  if (isError) return <Text>Something went wrong</Text>

  return (
    <>
    <View>
      <Image source={{uri: data?.images[0]}} style={styles.image} />
      <Text>{data?.title}</Text>
      <Text>{data?.description}</Text>
      <Text>{data?.price}</Text>
    </View>
    </>
  )
}


const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60
  }
});


export default ProductDetails