import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, Dimensions, Animated } from 'react-native';
import GlobalStyle from '../../../styles/GlobalStyle';
import styles from './FoodCardStyles';
import FoodDetail from "../../modals/food-modal/FoodModal";
import UserDetail from "../../modals/user-modal/UserModal";
import client from "../../../utils/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

function BigFoodCard({ username, user_id, name, tags, image_url, description, price, food_id, rating, restaurantName, restaurantAddress,}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalPosition = useRef(new Animated.Value(windowHeight)).current;
  const [personalDetails, setPersonalDetails] = useState(null);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
        if (userId) {
          setCurrentUserId(userId);
        }
      } catch (error) {
        console.error('Error fetching user ID from AsyncStorage:', error);
      }
    };

    fetchCurrentUserId();
  }, []);

  const fetchUserDetailsForModal = (userId) => {
    client
      .get(`/profile/${userId}`)
      .then((response) => {
        setPersonalDetails(response.data);
        setUserModalVisible(true);
      })
      .catch((error) => {
        console.error('Error fetching user details for modal:', error);
      });
  };

  const fetchUserDetailsForNavigation = (userId) => {
    client
      .get(`/profile/${userId}`)
      .then((response) => {
        setPersonalDetails(response.data);
        navigation.navigate('Menu');
      })
      .catch((error) => {
        console.error('Error fetching user details for navigation:', error);
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

  const handleUsernamePress = () => {
    console.log(currentUserId);
    if (user_id == currentUserId) {
      fetchUserDetailsForNavigation(user_id);
    } else {
      fetchUserDetailsForModal(user_id);
    }
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
        <Text style={styles.username} onPress={handleUsernamePress}>
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