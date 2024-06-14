import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Chip } from "react-native-paper";

export default function CategoryItem({name}: {name: string}) {
  const [isSelected, setIsSelected] = useState(false);
  const categoryPress = () => {
    setIsSelected(!isSelected);
  }
  return(
    <View style={{marginHorizontal: 4}}>
    <Chip mode='outlined' onPress={categoryPress} selected={isSelected}>
    {name}
    </Chip>
    </View>
  )
}

