import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import ProductItem from '../components/ProductItem';
import {Text} from 'react-native-paper'
import { useEffect, useState } from 'react';
import {fetchAllProducts} from '../services/productAPI'


export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getAllProducts = async() => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData);
      } catch(error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllProducts();
  }, []);
  
  return (
    <SafeAreaView >
        <View style={styles.search}><Text variant="headlineMedium">Search</Text></View>
        <View style={styles.slider}><Text variant="headlineMedium">Slider</Text></View>
        <View style={styles.category}><Text variant="headlineMedium">Category</Text></View>
        <FlatList style={{}}
          data={products}
          numColumns={2}
          horizontal={false}
          renderItem={({item}) => <ProductItem name={item.name} price={item.price} imgPath=""/>}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.columnWrapper}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 128,
    backgroundColor: 'red'
  },
  search: {
    height: 64,
    backgroundColor: 'green'
  },
  category: {
    height: 64,
    backgroundColor: 'purple'
  },
  productsContainer: {
    padding: 12,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 200,
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
    paddingVertical: 20
  }
});
