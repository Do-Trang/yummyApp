import React from 'react';
import { Text, View, Image, useWindowDimensions } from 'react-native';
import GlobalStyle from '../../../styles/GlobalStyle';
import styles from './FoodCardStyles';

function BigFoodCard(props) {
  const window = useWindowDimensions();
  
  const title = props.name ?? 'Untitled';
  const tags = props.tags ?? [];
  const image = props.image_url ?? null;
  const description = props.description ?? 'Food description.';
  const price = props.price ?? 'No price available';
  const foodId = props.food_id ?? '';
  const rating = props.rating ?? {};
  const restaurantName = props.restaurantName ?? 'Unknown Restaurant';
  const restaurantAddress = props.restaurantAddress ?? 'Unknown Address';

  return (
    <View style={styles.detailView}>
      {image && (<Image style={{ width: window.width, height: window.width }} source={{ uri: image }} />)}
      <View style={GlobalStyle.TitleBox}>
        <Text style={GlobalStyle.Title}>{title}</Text>
      </View>
      <View style={GlobalStyle.SubtitleBox}>
        <Text style={GlobalStyle.Subtitle}>{tags.join('・')}</Text>
      </View>
      <View style={GlobalStyle.DescBox}>
        <Text numberOfLines={4} ellipsizeMode={'tail'} style={[GlobalStyle.Desc, styles.desc]}>
          {description}
        </Text>
        <Text style={[GlobalStyle.CustomFont, styles.seeMore]}
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

export default BigFoodCard;