import React, {useState, useEffect} from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {SmallFoodCard} from '../components/cards/food-cards/SmallFoodCard';
import FoodSearchBar from '../components/searchbar/FoodSearchBar';

import GlobalStyle from '../styles/GlobalStyle';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';
import {Icons} from '../components/icons';
import {SmallRestaurantCard} from '../components/cards/restaurant-cards/SmallRestaurantCard';
import RestaurantSearchBar from '../components/searchbar/RestaurantSearchBar';
import client from "../utils/axios";

export default function SearchScreen() {
  const [foodData, setFoodData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [type, setType] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (type) {
          const response = await client.get('/foods');
          setFoodData(response.data.food);
        } else {
          const response = await client.get('/restaurants');
          setRestaurantData(response.data.restaurants);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [type]);

  return (
    <View style={[GlobalStyle.content]}>
      <CustomButton icon_name={type === 'food' ? 'hamburger' : 'store'} style={styles.typeIcon}
        onPress={() => {
          if (type === 'food') {
            setType('retaurant');
          } else {
            setType('food');
          }
        }}
        colors={[colors.home1, colors.home2, colors.white]}
        type={Icons.FontAwesome5}
      />

      {type === 'food' ? (
        <FoodSearchBar 
          onSearch={query => {
            
          }}
        />
      ) : (
        <RestaurantSearchBar 
          onSearch={query => {
            
          }}
        />
      )}

      <SafeAreaView style={styles.favBox}>
        {type === 'food' ? (
          <FlatList
            data={foodData} initialNumToRender={4}
            renderItem={item => {
              return (
                <SmallFoodCard
                  name={item.name}
                  tags={item.tags}
                  image_url={item.image_url}
                  description={item.description}
                  price={item.price}
                  food_id={item.food_id}
                  rating={item.rating}
                  restaurantName={item.restaurantName}
                  restaurantAddress={item.restaurantAddress}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        ) : (
          <FlatList 
            data={restaurantData} initialNumToRender={4}
            renderItem={item => {
              return (
                <SmallRestaurantCard
                  restaurant_id={item.id} 
                  name={item.name} 
                  address={item.address} 
                  phone_number={item.phone_number}
                  website={item.website}
                  description={item.description}
                  image_url={item.image_url}
                  rating={item.rating}
                  tags={item.tags}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        )}
        <View style={{height: 64, width: 1}}></View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  favBox: {
    marginTop: '2%',
    marginBottom: '4%',
    width: '100%',
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 10,
  },
  typeIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
    elevation: 10,
  },
  halfNhalf: {
    width: '100%',
    borderColor: colors.primary,
    borderBottomWidth: 1,
    fontSize: 16,
    marginVertical: '2%',
    paddingVertical: '1%',
  },
});
