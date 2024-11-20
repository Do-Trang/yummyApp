import React from 'react';
import { Text, View, Image, useWindowDimensions } from 'react-native';
import GlobalStyle from '../../../styles/GlobalStyle';
import styles from './RestaurantCardStyles';

function BigRestaurantCard(props) {
  const window = useWindowDimensions();

  const restaurantId = props.restaurant_id ?? '';
  const title = props.name ?? 'Unknown Restaurant';
  const restaurantAddress = props.address ?? 'Unknown Address';
  const phoneNumber = props.phone_number ?? 'No phone number available';
  const website = props.website ?? 'No website available';
  const description = props.description ?? 'Restaurant description.';
  const image = props.image_url ?? null;
  const rating = props.rating ?? {};
  const tags = props.tags ?? [];

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
            props.navigation.push('DetailScreen', { 
                restaurantId: restaurantId,
                name: title,
                address: restaurantAddress,
                phone_number: phoneNumber,
                website: website,
                description: description,
                image_url: image,
                rating: rating,
                tags: tags,
            });
        }}>
          {'>>  '}Xem thêm
        </Text>
      </View>
    </View>
  );
}

export default BigRestaurantCard;
