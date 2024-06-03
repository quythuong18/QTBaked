import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import ProductItem from '../components/ProductItem';
import {ActivityIndicator, Button, Text} from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react';
import {fetchAllProducts} from '../services/productAPI'
import {ScrollView } from'react-native-virtualized-view'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderProducts = useCallback(({item}) => (<ProductItem  name={item.name} price={item.price} imgPath={item.imgPath}/>), [])
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
    <ScrollView style={{}}>
        <View style={styles.search}><Text variant="headlineMedium">Search</Text></View>
        <View style={styles.slider}><Text variant="headlineMedium">Slider</Text></View>
        <View style={styles.category}><Text variant="headlineMedium">Category</Text></View>
        <ScrollView>
        
        </ScrollView>
        {
          isLoading? (
              <ActivityIndicator style={{paddingTop: 20}} size='large' />
          ) : (
              <FlatList 
                showsHorizontalScrollIndicator={false}
                data={products}
                numColumns={2}
                horizontal={false}
                renderItem={renderProducts}
                keyExtractor={item => item.id}
                columnWrapperStyle={styles.columnWrapper}
              />
          )
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 128,
    backgroundColor: 'green'
  },
  search: {
    height: 64,
    backgroundColor: 'white'
  },
  category: {
    height: 64,
    backgroundColor: 'purple'
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
    paddingVertical: 16
  },
});
