import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/apiClient'; // Assuming getProducts fetches product data
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';


function ProductList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'], // Use 'products' for better clarity
    queryFn: getProducts, // Assuming getProducts returns an array of product objects
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Something went wrong:</Text>; // Include error message
  }

  if (!data?.length) {
    return <Text>No products found.</Text>; // Handle empty data case
  }

  const products = data

  return (
  <>
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View>
            <Link
              href={`/productDetails/${item.id}`} // Use the named route
              key={item.id}
            >
              <Text>{item.title}</Text>
            </Link>
            <Text>{item.description}</Text>
            <Image style={styles.image} source={{ uri: item.images[0] }} />
            <Text>{item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  </>
  );
}


export default ProductList;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  }
});
