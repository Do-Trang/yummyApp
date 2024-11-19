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

    export default BigRestaurantCard;