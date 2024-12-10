import React, { useState, useRef } from 'react';
import { Text, View, Image, Dimensions, Animated } from 'react-native';
import GlobalStyle from '../../../styles/GlobalStyle';
import styles from './RestaurantCardStyles';
import RestaurantDetail from "../../modals/restaurant-modal/RestaurantModal";

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

function SmallRestaurantCard({restaurant_id, name, address, phone_number, website, description, image_url, rating, tags}) {
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
        style={[styles.smallCardImage, { width: window.width / 3, height: window.width / 2 }]}
        source={{ uri: image_url }}
      />
      <View style={{ paddingHorizontal: 8, width: '66%' }}>
        <Text style={[GlobalStyle.Title, { fontSize: 20 }]} numberOfLines={1}>
          {name || 'Unknown Restaurant'}
        </Text>
        <Text style={[GlobalStyle.Subtitle]} numberOfLines={2}>
          - {tags?.join(', ') || 'No tags available'}
        </Text>
        <Text style={[GlobalStyle.CustomFont, styles.seeMore]} onPress={openModal}>
          {'>>  '}More
        </Text>
        {isModalVisible && (
                <RestaurantDetail
                    id={restaurant_id}
                    modalPosition={modalPosition}
                    onClose={closeModal}
                    modalVisible={isModalVisible}
                    restaurantDetails={{restaurant : {name, tags, image_url, description, phone_number, rating, address, website}}}
                />
            )}
      </View>
    </View>
  );
}

export default SmallRestaurantCard;