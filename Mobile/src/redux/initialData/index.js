import { FOOD_DATA } from './foodData';
import { TAG_DATA } from './tagData';
import { INGREDIENT_DATA } from './ingredientData';
import { RESTAURANT_DATA } from './restaurantData';

const FAVORITE_DATA = {
  food: [1, 3],
  restaurant: [1, 2],
};

const BLACKLIST_DATA = {
  food: [],
  restaurant: [],
};

const TAG_OUT_DATA = [1, 6];

const CONFIG_DATA = {
  darkTheme: false,
}

export const InitialState = {
  FOOD_DATA,
  TAG_DATA,
  INGREDIENT_DATA,
  RESTAURANT_DATA,
  FAVORITE_DATA,
  BLACKLIST_DATA,
  TAG_OUT_DATA,
  CONFIG_DATA,
};
