import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {SmallFoodCard} from '../components/FoodCard';

import GlobalStyle from '../styles/GlobalStyle';
import CustomButton from '../components/CustomButton';
import colors from '../constants/colors';
import {Icons} from '../components/icons';
import {IngredientDialog, TagDialog} from '../components/CustomDialog';
import {SmallRestaurantCard} from '../components/RestaurantCard';

function SearchScreen(props) {
  const [foodData, setFoodData] = useState(props.foods.data); // render flatlist
  const [restaurantData, setRestaurantData] = useState(props.restaurants.data);
  const [type, setType] = useState(true); // food || restaurant
  const [showTag, setShowTag] = useState(false); // tag dialog
  const [showIngredient, setShowIngredient] = useState(false); // ingredient dialog

  const [filter, setFilter] = useState({
    ingredients: [],
    tags: [],
  });

  useEffect(() => {
    const newFoodData = props.foods.data.filter(food => {
      const hasAllTags = filter.tags.every(tag =>
        food.tags.find(item => tag.id === item),
      );
      const hasAllIngredients = filter.ingredients.every(ingredient =>
        food.ingredients.find(item => ingredient.id === item),
      );
      return (
        (filter.tags.length === 0 || hasAllTags) &&
        (filter.ingredients.length === 0 || hasAllIngredients)
      );
    });
    const newRestaurantData = props.restaurants.data.filter(food => {
      const hasAllTags = filter.tags.every(tag =>
        food.tags.find(item => tag.id === item),
      );
      return filter.tags.length === 0 || hasAllTags;
    });
    setFoodData(newFoodData);
    setRestaurantData(newRestaurantData);
  }, [filter]);

  return (
    <View style={[GlobalStyle.content]}>
      <CustomButton
        icon_name={type === 'food' ? 'hamburger' : 'store'}
        style={styles.typeIcon}
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

      <View style={[GlobalStyle.TitleBoxHeader]}>
        <Text style={GlobalStyle.Title}>Tìm kiếm</Text>
      </View>

      {showTag && (
        <TagDialog
          open={showTag}
          onCancel={() => setShowTag(false)}
          setNewFood={item => setFilter(item)}
          newFood={filter}
        />
      )}
      {showIngredient && type === 'food' && (
        <IngredientDialog
          open={showIngredient}
          onCancel={() => setShowIngredient(false)}
          setNewFood={item => setFilter(item)}
          newFood={filter}
        />
      )}

      <SafeAreaView style={styles.favBox}>
        <View style={{width: '100%'}}>
          <TouchableOpacity onPress={() => setShowTag(true)}>
            <Text
              style={[GlobalStyle.CustomFont, styles.halfNhalf]}
              numberOfLines={1}>
              Thẻ tags: {filter.tags.map(item => item.title).join(', ')}
            </Text>
          </TouchableOpacity>
          {type === 'food' && (
            <TouchableOpacity onPress={() => setShowIngredient(true)}>
              <Text style={[GlobalStyle.CustomFont, styles.halfNhalf]}>
                Nguyên liệu:{' '}
                {filter.ingredients.map(item => item.title).join(', ')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {type === 'food' ? (
          <FlatList
            data={foodData}
            // fix VirtualizedList: You have a large list that is slow to update
            initialNumToRender={4}
            renderItem={item => {
              return (
                <SmallFoodCard food={item.item} navigation={props.navigation} />
              );
            }}
            keyExtractor={item => item.id}
          />
        ) : (
          <FlatList
            data={restaurantData}
            initialNumToRender={4}
            renderItem={item => {
              return (
                <SmallRestaurantCard
                  restaurant={item.item}
                  navigation={props.navigation}
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
  halfNhalf: {
    width: '100%',
    borderColor: colors.primary,
    borderBottomWidth: 1,
    fontSize: 16,
    marginVertical: '2%',
    paddingVertical: '1%',
  },
});

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  tags: state.tags,
  foods: state.filteredFoods,
  restaurants: state.restaurants,
});

export default connect(mapStateToProps, {})(SearchScreen);
