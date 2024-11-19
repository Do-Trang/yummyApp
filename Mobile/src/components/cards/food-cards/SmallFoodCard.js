import React from 'react';
import { Text, View, Image, useWindowDimensions } from 'react-native';
import GlobalStyle from '../../../styles/GlobalStyle';
import styles from './FoodCardStyles';

function SmallFoodCard(props) {
  const window = useWindowDimensions();

  const title = props.title ?? 'Untitled';
  const tags = props.tags ?? [];
  const image = props.image_url ?? null;
  const description = props.description ?? 'Food description.';
  const price = props.price ?? 'No price available';
  const foodId = props.food_id ?? '';
  const rating = props.rating ?? {};
  const restaurantName = props.restaurantName ?? 'Unknown Restaurant';
  const restaurantAddress = props.restaurantAddress ?? 'Unknown Address';

  return (
    <View style={styles.smallCard}>
      {image && (
        <Image
          style={[styles.smallCardImage, { width: window.width / 3, height: window.width / 2 }]}
          source={{ uri: image }}
        />
      )}

      <View style={{ paddingHorizontal: 8, width: '66%' }}>
        <Text style={[GlobalStyle.Title, { fontSize: 20 }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[GlobalStyle.Subtitle]} numberOfLines={2}>
          - {tags.join(', ')}
        </Text>
        <Text
          style={[GlobalStyle.CustomFont, styles.seeMore]}
          onPress={() => {
            // props.navigation.push('DetailScreen', {  
            //   name: title,
            //   tags: tags,
            //   image_url: image,
            //   description: description,
            //   price: price,
            //   food_id: foodId,
            //   rating: rating,
            //   restaurantName: restaurantName,
            //   restaurantAddress: restaurantAddress,
            // });
          }}
        >
          {'>>  '}Xem thêm
        </Text>
      </View>
    </View>
  );
}

export default SmallFoodCard;