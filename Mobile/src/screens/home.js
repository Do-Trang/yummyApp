import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import GlobalStyle from '../styles/GlobalStyle';
import CustomButton, { CustomButtonOutline } from '../components/CustomButton';
import { Icons } from '../components/icons';
import BigFoodCard from '../components/cards/food-cards/BigFoodCard';
import BigRestaurantCard from '../components/cards/restaurant-cards/BigRestaurantCard';
import colors from '../constants/colors';
import client from '../utils/axios';

const randomGen = number => Math.floor(Math.random() * number);
const randomGenExcept = (number, lastNum) => {
  let nextNum = Math.random() * number;
  while (Math.floor(nextNum) === lastNum) {
    nextNum = Math.random() * number;
  }
  return Math.floor(nextNum);
};

function Home() {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [seed1, setSeed1] = useState(0);
  const [seed2, setSeed2] = useState(0);
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

  const fetchFoods = () => {
    client.get('/foods')
      .then(response => {
        const data = response.data;
        console.log(data);
        setFoods(data);
        setSeed1(randomGen(data.length));
        setCurrentFood(data[randomGen(data.length)]);
      })
      .catch(error => {
        console.error('Failed to fetch foods:', error);
      });
  };

  const fetchRestaurants = () => {
    client.get('/restaurants')
      .then(response => {
        const data = response.data;
        console.log(data);
        setRestaurants(data);
        setSeed2(randomGen(data.length));
        setCurrentRestaurant(data[randomGen(data.length)]);
      })
      .catch(error => {
        console.error('Failed to fetch restaurants:', error);
      });
  };

  const addToFavorites = (item, itemType) => {
    if (!item) return;
  
    let endpoint = '';
    let payload = {};
  
    if (itemType === 'food') {
      endpoint = '/swiped-foods';
      payload = {
        foodId: item.food_id,
        swipeDirection: 'right',
      };
    } else if (itemType === 'restaurant') {
      endpoint = '/swiped-restaurants';
      payload = {
        restaurantId: item.restaurant_id,
        swipeDirection: 'right',
      };
    }
  
    client.post(endpoint, payload)
      .then(response => {
        console.log(`${itemType === 'food' ? 'Food' : 'Restaurant'} added to favorites with swipeDirection: right`);
      })
      .catch(error => {
        console.error(`Failed to add ${itemType} to favorites:`, error);
      });
  };  
  
  const addToBlacklist = (item, itemType) => {
    if (!item) return;
  
    let endpoint = '';
    let payload = {};
  
    if (itemType === 'food') {
      endpoint = '/swiped-foods';
      payload = {
        foodId: item.food_id,
        swipeDirection: 'left',
      };
    } else if (itemType === 'restaurant') {
      endpoint = '/swiped-restaurants';
      payload = {
        restaurantId: item.restaurant_id,
        swipeDirection: 'left',
      };
    }
  
    client.post(endpoint, payload)
      .then(response => {
        console.log(`${itemType === 'food' ? 'Food' : 'Restaurant'} added to blacklist with swipeDirection: left`);
      })
      .catch(error => {
        console.error(`Failed to add ${itemType} to blacklist:`, error);
      });
  };

  const nextRandomItem = () => {
    if (type === 'food') {
      const newSeed = randomGenExcept(foods.length, seed1);
      setSeed1(newSeed);
      setCurrentFood(foods[newSeed]);
    } else {
      const newSeed = randomGenExcept(restaurants.length, seed2);
      setSeed2(newSeed);
      setCurrentRestaurant(restaurants[newSeed]);
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
        currentFood && 
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
        currentRestaurant && 
          <BigRestaurantCard
            username={currentRestaurant.username}
            user_id={currentRestaurant.user_id}
            name={currentRestaurant.name}
            tags={currentRestaurant.tags}
            image_url={currentRestaurant.image_url}
            description={currentRestaurant.description}
            address={currentRestaurant.address}
            restaurant_id={currentRestaurant.restaurant_id}
            rating={currentRestaurant.rating}
            phone_number={currentRestaurant.phone_number}
            website={currentRestaurant.website}
          />
      )}

      <View style={styles.bottomTab}>
        <CustomButtonOutline
          icon_name="md-close"
          type="ionicon"
          colors={[colors.dislike2, colors.dislike1, colors.white]}
          size={36}
          onPress={() => {
            const item = type === 'food' ? currentFood : currentRestaurant;
            addToBlacklist(item, type);
            nextRandomItem();
          }}
        />

        <CustomButtonOutline
          icon_name="ios-heart"
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