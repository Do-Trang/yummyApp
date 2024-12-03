import React, { useState, useRef } from 'react';
import { Text, View, Image, Dimensions, Animated } from 'react-native';
import GlobalStyle from '../../../styles/GlobalStyle';
import styles from './FoodCardStyles';
import FoodDetail from "../../modals/food-modal/FoodModal";
import UserDetail from "../../modals/user-modal/UserModal";
import client from "../../../utils/axios";

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

function BigFoodCard({username, user_id, name, tags, image_url, description, price, food_id, rating, restaurantName, restaurantAddress,}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalPosition = useRef(new Animated.Value(windowHeight)).current;
  const [personalDetails, setPersonalDetails] = useState(null);
  const [isUserModalVisible, setUserModalVisible] = useState(false);

  const fetchUserDetails = (userId) => {
    client
      .get(`/profile/${userId}`)
      .then((response) => {
        setPersonalDetails(response.data);
        setUserModalVisible(true);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };

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

  const closeUserModal = () => {
    setUserModalVisible(false);
  };

  return (
    <View style={styles.detailView}>
      <Image style={{ width: windowWidth - 10, height: windowWidth - 10 }} source={{ uri: image_url }} />
      <View style={GlobalStyle.TitleBox}>
        <Text style={GlobalStyle.Title}>{name}</Text>
      </View>
      <View style={GlobalStyle.SubtitleBox}>
        <Text style={GlobalStyle.Subtitle}>{tags.join('・')}</Text>
      </View>
      <View style={styles.usernameBox}>
        <Text style={styles.username} onPress={() => fetchUserDetails(user_id)}>
          Uploaded by: {username}
        </Text>
      </View>
      <View style={GlobalStyle.DescBox}>
        <Text numberOfLines={4} ellipsizeMode={'tail'} style={[GlobalStyle.Desc, styles.desc]}>
          {description}
        </Text>
        <Text style={[GlobalStyle.CustomFont, styles.seeMore]} onPress={openModal}>
          {'>>  '}More
        </Text>
      </View>

      {isModalVisible && (
        <FoodDetail
          food_id={food_id}
          modalPosition={modalPosition}
          onClose={closeModal}
          modalVisible={isModalVisible}
          foodDetails={{ food: { name, tags, image_url, description, price, rating, restaurantName, restaurantAddress } }}
        />
      )}

      {isUserModalVisible && (
        <UserDetail
          user_id={user_id}
          modalVisible={isUserModalVisible}
          personalDetails={personalDetails}
          onClose={closeUserModal}
        />
      )}
    </View>
  );
}

export default BigFoodCard;