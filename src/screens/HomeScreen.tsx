import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import ProductItem from '../components/ProductItem';
import CategoryItem from '../components/CategoryItem';
import {ActivityIndicator, Appbar, Button, Text} from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react';
import {fetchAllProducts} from '../services/productAPI'
import {ScrollView } from'react-native-virtualized-view'
import { fetchAllCategories } from '../services/categoryAPI';
import { Image } from 'expo-image';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderProducts = useCallback(({item}) => (<ProductItem  name={item.name} price={item.price} imgPath={item.imgPath}/>), [])
  const renderCategories = useCallback(({item}) => (<CategoryItem  name={item.name} />), [])
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

    const getCategories = async() => {
      try {
        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData);
        console.log(categoriesData);
        console.log(categoriesData);
      } catch(error) {
        console.error('Failed to fetch categories:', error);
      }
    }
      getCategories();
      getAllProducts();
   }, []);
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.slider}>
        <Image source={"https://wallpaperboat.com/wp-content/uploads/2020/02/bakery-12.jpg"} transition={300} style={{height:'100%', width: '100%'}}></Image>
        </View>
        <FlatList 
          style={styles.category}
          horizontal={true}
          data={categories}
          renderItem={renderCategories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
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
                columnWrapperStyle={styles.productColumnWrapper}
              />
          )
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 128,
  },
  search: {
    height: 64,
    backgroundColor: 'white',
    marginTop: 12,
    marginHorizontal: 8
  },
  category: {
    height: 64,
    paddingTop: 12
  },
  categoryColumnWrapper: {
    justifyContent: 'space-evenly',
    paddingVertical: 16
  },
  productColumnWrapper: {
    justifyContent: 'space-evenly',
    paddingVertical: 16
  },
});
