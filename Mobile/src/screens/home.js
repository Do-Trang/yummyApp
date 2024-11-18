import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import GlobalStyle from '../styles/GlobalStyle';
import CustomButton, {CustomButtonOutline} from '../components/CustomButton';
import {Icons} from '../components/icons';
import CustomDialog, {
  DislikeDialog,
  LikeDialog,
} from '../components/CustomDialog';
import FoodCard from '../components/FoodCard';
import RestaurantCard from '../components/RestaurantCard';
import colors from '../constants/colors';
import {
  addFoodToFavorite,
  addRestaurantToFavorite,
  addFoodToBlacklist,
  addRestaurantToBlacklist,
} from '../redux/actions';

const randomGen = number => Math.floor(Math.random() * number);
const randomGenExcept = (number, lastNum) => {
  let nextNum = Math.random() * number;
  while (Math.floor(nextNum) === lastNum) {
    nextNum = Math.random() * number;
  }
  return Math.floor(nextNum);
};

function Home(props) {
  const [seed1, setSeed1] = useState(randomGen(props.foods.data.length));
  const [seed2, setSeed2] = useState(randomGen(props.restaurants.data.length));
  const [currentFood, setCurrentFood] = useState(props.foods.data[seed1]);
  const [currentRestaurant, setCurrentRestaurant] = useState(
    props.restaurants.data[seed2],
  );
  const [type, setType] = useState('food');
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const nextRandomItem = () => {
    if (type === 'food') {
      const newSeed = randomGenExcept(props.foods.data.length, seed1);
      setSeed1(newSeed);
      setCurrentFood(props.foods.data[newSeed]);
    } else {
      const newSeed = randomGenExcept(props.restaurants.data.length, seed2);
      setSeed2(newSeed);
      setCurrentRestaurant(props.restaurants.data[newSeed]);
    }
  };

  return (
    <View style={[GlobalStyle.content, styles.content]}>
      <CustomButton
        icon_name={type == 'food' ? 'hamburger' : 'store'}
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

      {type === 'food' ? (
        <FoodCard navigation={props.navigation} food={currentFood} />
      ) : (
        <RestaurantCard
          navigation={props.navigation}
          restaurant={currentRestaurant}
        />
      )}

      <View style={styles.bottomTab}>
        <CustomButtonOutline
          icon_name="md-close"
          type="ionicon"
          colors={[colors.dislike2, colors.dislike1, colors.white]}
          size={36}
          onLongPress={() => setDislike(true)}
          onPress={() => {
            nextRandomItem();
          }}
          onOK={() => setDislike(false)}
        />
        <CustomButtonOutline
          icon_name="ios-heart"
          type="ionicon"
          colors={[colors.like1, colors.like2, colors.white]}
          size={36}
          onLongPress={() => setLike(true)}
          onPress={() => {
            if (type === 'food') {
              props.addFoodToFavorite(currentFood.id);
            } else {
              props.addRestaurantToFavorite(currentRestaurant.id);
            }
            // props.addFoodToFavorite(type === 'food' ? seed1 : seed2);
            nextRandomItem();
          }}
          onOK={() => setLike(false)}
        />
      </View>
      {like ? (
        <LikeDialog
          open={like}
          onCancel={() => {
            setLike(false);
          }}
          onOK={() => {
            if (type === 'food') {
              props.addFoodToFavorite(currentFood.id);
              props.navigation.push('Detail', {
                detail: currentFood,
                type: 'food',
              });
            } else {
              props.addRestaurantToFavorite(currentRestaurant.id);
              props.navigation.push('Detail', {
                detail: currentRestaurant,
                type: 'restaurant',
              });
            }
            setLike(false);
          }}
          content={
            type === 'food'
              ? 'Zô, vậy là bạn thích ' +
                currentFood.title +
                '. Chần chừ chi mà hông đi ăn thôi nào!'
              : 'Zô, vậy là bạn thích ' +
                currentRestaurant.title +
                '. Chần chừ chi mà hông đi ăn thôi nào!'
          }
        />
      ) : null}

      {dislike ? (
        <DislikeDialog
          open={dislike}
          onCancel={() => {
            setDislike(false);
          }}
          onOK={() => {
            if (type === 'food') {
              props.addFoodToBlacklist(currentFood.id);
            } else {
              props.addRestaurantToBlacklist(currentRestaurant.id);
            }
            nextRandomItem();
            setDislike(false);
          }}
          content={
            type === 'food'
              ? 'Zô, vậy là bạn hông thích ' +
                currentFood.title +
                '. Vậy để mình thêm vào hố đen nhá!'
              : 'Zô, vậy là bạn hông thích ' +
                currentRestaurant.title +
                '. Vậy để mình thêm vào hố đen nhá!'
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 75, // as 60 for navbar, 15 for spacing
  },

  typeIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
    elevation: 10,
  },

  desc: {
    overflow: 'hidden',
    textAlign: 'center',
  },

  seeMore: {
    color: colors.gray,
    textDecorationLine: 'underline',
  },

  detailView: {
    width: '100%',
    height: '50%',
    // marginTop: '1%',
    marginBottom: '10%',
  },
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    // bottom: 80,
  },
});

const mapStateToProps = state => ({
  foods: state.filteredFoods,
  restaurants: state.filteredRestaurants,
  ingredients: state.ingredients,
  tags: state.tags,
});

export default connect(mapStateToProps, {
  addFoodToFavorite,
  addRestaurantToFavorite,
  addFoodToBlacklist,
  addRestaurantToBlacklist,
})(Home);
