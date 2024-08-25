import { StyleSheet, View } from 'react-native'
import ProductList from '@/components/prdouctList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function TabOneScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <ProductList />
      </View>
    </QueryClientProvider>
  )
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
})
