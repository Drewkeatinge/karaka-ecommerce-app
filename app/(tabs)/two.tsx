import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, View, Text } from 'react-native';

const queryClient = new QueryClient()

export default function TabTwoScreen() {
  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      <Text>Cart</Text>
    </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
