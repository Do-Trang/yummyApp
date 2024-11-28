import React, { useState, useRef } from 'react';
import { Text, View, Image, Dimensions, Animated } from 'react-native';
import GlobalStyle from '../../../styles/GlobalStyle';
import styles from './FoodCardStyles';
import FoodDetail from "../../modals/food-modal/FoodModal";

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

function SmallFoodCard({name, tags, image_url, description, price, food_id, rating, restaurantName, restaurantAddress,}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalPosition = useRef(new Animated.Value(windowHeight)).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(modalPosition, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalPosition, {
      toValue: windowHeight,
      duration: 900,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.smallCard}>
      <Image
        style={[styles.smallCardImage, { width: windowWidth / 3, height: windowWidth / 2 }]}
        source={{ uri: image_url }}
      />

      <View style={{ paddingHorizontal: 8, width: '66%' }}>
        <Text style={[GlobalStyle.Title, { fontSize: 20 }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[GlobalStyle.Subtitle]} numberOfLines={2}>
          - {tags.join(', ')}
        </Text>
        <Text style={[GlobalStyle.CustomFont, styles.seeMore]} onPress={openModal}>
          {'>>  '}More
        </Text>
      </View>

      {isModalVisible && (
        <FoodDetail
          id={food_id}
          modalPosition={modalPosition}
          onClose={closeModal}
          modalVisible={isModalVisible}
          foodDetails={{food : {name, tags, image_url, description, price, rating, restaurantName, restaurantAddress,}}}
        />
      )}
    </View>
  );
}

export default SmallFoodCard;