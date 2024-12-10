import React, {useState, useEffect} from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SmallFoodCard from '../components/cards/food-cards/SmallFoodCard';
import FoodSearchBar from '../components/searchbar/FoodSearchBar';

import GlobalStyle from '../styles/GlobalStyle';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';
import {Icons} from '../components/icons';
import SmallRestaurantCard from '../components/cards/restaurant-cards/SmallRestaurantCard';
import RestaurantSearchBar from '../components/searchbar/RestaurantSearchBar';
import client from "../utils/axios";

export default function SearchScreen() {
  const [foodData, setFoodData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [type, setType] = useState('food');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoodData, setFilteredFoodData] = useState([]);
  const [filteredRestaurantData, setFilteredRestaurantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'food') {
          const response = await client.get('/foods');
          setFoodData(response.data.food);
          setFilteredFoodData(response.data.food); // Set food data initially
        } else {
          const response = await client.get('/restaurants');
          setRestaurantData(response.data.restaurants);
          setFilteredRestaurantData(response.data.restaurants); // Set restaurant data initially
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [type]);

  // Handle search for food items
  const handleFoodSearch = (query) => {
    setSearchQuery(query);
    setFilteredFoodData(foodData.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    ));
  };

  // Handle search for restaurant items
  const handleRestaurantSearch = (query) => {
    setSearchQuery(query);
    setFilteredRestaurantData(restaurantData.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    ));
  };

  return (
    <View style={[GlobalStyle.content]}>
      <CustomButton 
        icon_name={type === 'food' ? 'hamburger' : 'store'} 
        style={styles.typeIcon}
        onPress={() => {
          if (type === 'food') {
            setType('restaurant');
          } else {
            setType('food');
          }
        }}
        colors={[colors.home1, colors.home2, colors.white]}
        type={Icons.FontAwesome5}
      />

      <CustomButton
        icon_name="search"
        style={styles.searchIcon}
        onPress={() => setShowSearchBar(!showSearchBar)}
        colors={[colors.home1, colors.home2, colors.white]}
        type={Icons.FontAwesome5}
      />

      {/* Display search bar if active */}
      {showSearchBar && (type === 'food' ? (
        <FoodSearchBar onSearch={handleFoodSearch} />
      ) : (
        <RestaurantSearchBar onSearch={handleRestaurantSearch} />
      ))}

      <SafeAreaView style={styles.favBox}>
        {type === 'food' ? (
          <FlatList
            data={filteredFoodData} // Use filtered data
            initialNumToRender={4}
            renderItem={({item}) => {
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
          />
        ) : (
          <FlatList 
            data={filteredRestaurantData} // Use filtered data
            initialNumToRender={4}
            renderItem={({item}) => {
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
  searchIcon: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 1, 
    borderRadius: 25,
  },
});