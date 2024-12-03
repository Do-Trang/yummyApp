import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalStyle from '../styles/GlobalStyle';
import CustomButton, { CustomButtonOutline } from '../components/CustomButton';
import {CustomButtonOutline1} from '../components/CustomButton';
import { Icons } from '../components/icons';
import BigFoodCard from '../components/cards/food-cards/BigFoodCard';
import BigRestaurantCard from '../components/cards/restaurant-cards/BigRestaurantCard';
import colors from '../constants/colors';
import client from '../utils/axios';


import {
 addFoodToFavorite,
 addRestaurantToFavorite,
 addFoodToBlacklist,
 addRestaurantToBlacklist,
} from '../redux/actions';
const randomGen = (number) => Math.floor(Math.random() * number);

function Home() {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [currentFood, setCurrentFood] = useState(null);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [type, setType] = useState('food');

  useEffect(() => {
    if (type === 'food') {
      fetchFoods();
    } else if (type === 'restaurant') {
      fetchRestaurants();
    }
  }, [type]);

  useEffect(() => {
    console.log('Foods:', foods);
    console.log('Restaurants:', restaurants);
    console.log('Current Food:', currentFood);
    console.log('Current Restaurant:', currentRestaurant);
  }, [foods, restaurants, currentFood, currentRestaurant]);

  // Fetch food data
  const fetchFoods = async () => {
    try {
      const response = await client.get('/foods');
      console.log('Fetched Foods:', response.data);
      if (response.data && response.data.food) {
        setFoods(response.data.food);
        setCurrentFood(response.data.food[randomGen(response.data.food.length)]);
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  // Fetch restaurant data
  const fetchRestaurants = async () => {
    try {
      const response = await client.get('/restaurants');
      console.log('Fetched Restaurants:', response.data);
      if (response.data && response.data.restaurants) {
        setRestaurants(response.data.restaurants);
        setCurrentRestaurant(response.data.restaurants[randomGen(response.data.restaurants.length)]);
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Add to favorites
  const addToFavorites = (item, itemType) => {
    if (!item) return;

    let endpoint = '';
    let payload = {};

    if (itemType === 'food') {
      endpoint = '/swiped-foods';
      payload = { foodId: item.food_id, swipeDirection: 'right' };
    } else if (itemType === 'restaurant') {
      endpoint = '/swiped-restaurants';
      payload = { restaurantId: item.restaurant_id, swipeDirection: 'right' };
    }

    client.post(endpoint, payload)
      .then(() => {
        console.log(`${itemType === 'food' ? 'Food' : 'Restaurant'} added to favorites`);
      })
      .catch((error) => {
        console.error(`Failed to add ${itemType} to favorites:`, error);
      });
  };

  // Add to blacklist
  const addToBlacklist = (item, itemType) => {
    if (!item) return;

    let endpoint = '';
    let payload = {};

    if (itemType === 'food') {
      endpoint = '/swiped-foods';
      payload = { foodId: item.food_id, swipeDirection: 'left' };
    } else if (itemType === 'restaurant') {
      endpoint = '/swiped-restaurants';
      payload = { restaurantId: item.restaurant_id, swipeDirection: 'left' };
    }

    client.post(endpoint, payload)
      .then(() => {
        console.log(`${itemType === 'food' ? 'Food' : 'Restaurant'} added to blacklist`);
      })
      .catch((error) => {
        console.error(`Failed to add ${itemType} to blacklist:`, error);
      });
  };

  // Load next random item
  const nextRandomItem = () => {
    if (type === 'food') {
      setCurrentFood(foods[randomGen(foods.length)]);
    } else {
      setCurrentRestaurant(restaurants[randomGen(restaurants.length)]);
    }
  };

  return (
    <View style={[GlobalStyle.content, styles.content]}>
      <CustomButton
        icon_name={type === 'food' ? 'hamburger' : 'store'}
        style={styles.typeIcon}
        onPress={() => setType(type === 'food' ? 'restaurant' : 'food')}
        colors={[colors.home1, colors.home2, colors.white]}
        type={Icons.FontAwesome5}
      />



      {type === 'food' ? (
        currentFood ? (
          <BigFoodCard
            username={currentFood.username}
            user_id={currentFood.user_id}
            name={currentFood.name}
            tags={currentFood.tags}
            image_url={currentFood.image_url}
            description={currentFood.description}
            price={currentFood.price}
            food_id={currentFood.food_id}
            rating={currentFood.rating}
            restaurantName={currentFood.restaurantName}
            restaurantAddress={currentFood.restaurantAddress}
          />
        ) : (
          <Text>No food available</Text>
        )
      ) : (
        currentRestaurant ? (
          <BigRestaurantCard
            username={currentRestaurant.username}
            user_id={currentRestaurant.user_id}
            name={currentRestaurant.name}
            tags={currentRestaurant.tags }
            image_url={currentRestaurant.image_url}
            description={currentRestaurant.description}
            address={currentRestaurant.address}
            restaurant_id={currentRestaurant.restaurant_id}
            rating={currentRestaurant.rating}
            phone_number={currentRestaurant.phone_number}
            website={currentRestaurant.website}
          />
        ) : (
          <Text>No restaurant available</Text>
        )
      )}

      <View style={styles.bottomTab}>
        <CustomButtonOutline1
          icon_name="close-outline"
          type="ionicon"
          colors={[colors.dislike2, colors.dislike1, colors.white]}
          size={36}
          onPress={() => {
            const item = type === 'food' ? currentFood : currentRestaurant;
            addToBlacklist(item, type);
            nextRandomItem();
          }}
        />

        <CustomButtonOutline1
          icon_name="heart"
          type="ionicon"
          colors={[colors.like1, colors.like2, colors.white]}
          size={36}
          onPress={() => {
            const item = type === 'food' ? currentFood : currentRestaurant;
            addToFavorites(item, type);
            nextRandomItem();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 75,
    alignItems: 'center',
  },
  typeIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
    elevation: 10,
  },
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
  },
});

export default Home;