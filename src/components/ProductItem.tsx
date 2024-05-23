import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'expo-image'
import {Card} from 'react-native-paper'

interface ProductItemProps {
    name: string;
    price: string;
    imgPath: string;
}

export default function ProductItem({name, price, imgPath}:ProductItemProps) {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
        <Image source={imgPath} placeholder={require("../../assets/placeholder.jpg")} placeholderContentFit='cover' style={styles.img} transition={300}></Image>
        <View style={styles.Text}>
            <Text numberOfLines={1} style={styles.Title}>{name}</Text>
            <Text >Price: ${price}</Text>
        </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 154,
    height: 200
  },
  img: {
    borderRadius: 10,
    height: 130
  }, 
  Text: {
    padding: 8
  },
  Title: {
    fontWeight: "bold",
  }
});
