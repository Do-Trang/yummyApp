export const CREATE_FOOD = 'CREATE_FOOD';
export const CREATE_RESTAURANT = 'CREATE_RESTAURANT';
export const CREATE_INGREDIENT = 'CREATE_INGREDIENT';
export const SET_TAG = 'SET_TAG';
export const CREATE_TAG = 'CREATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const ADD_FOOD_TO_FAVORITE = 'ADD_FOOD_TO_FAVORITE';
export const REMOVE_FOOD_FROM_FAVORITE = 'REMOVE_FOOD_FROM_FAVORITE';
export const ADD_RESTAURANT_TO_FAVORITE = 'ADD_RESTAURANT_TO_FAVORITE';
export const REMOVE_RESTAURANT_FROM_FAVORITE =
  'REMOVE_RESTAURANT_FROM_FAVORITE';
export const ADD_FOOD_TO_BLACKLIST = 'ADD_FOOD_TO_BLACKLIST';
export const ADD_RESTAURANT_TO_BLACKLIST = 'ADD_RESTAURANT_TO_BLACKLIST';
export const FLUSH_LOCAL = 'FLUSH_LOCAL';
export const SET_DARKTHEME = 'SET_DARKTHEME';

export const createFood = newFood => dispatch => {
  dispatch({
    type: CREATE_FOOD,
    payload: newFood,
  });
};

export const createRestaurant = newRestaurant => dispatch => {
  dispatch({
    type: CREATE_RESTAURANT,
    payload: newRestaurant,
  });
};

export const createTag = newTag => dispatch => {
  dispatch({
    type: CREATE_TAG,
    payload: newTag,
  });
};

export const setTag = tag => dispatch => {
  dispatch({
    type: SET_TAG,
    payload: tag,
  });
};

export const deleteTag = oldTag => dispatch => {
  dispatch({
    type: DELETE_TAG,
    payload: oldTag,
  });
};

export const createIngredient = newIngredient => dispatch => {
  dispatch({
    type: CREATE_INGREDIENT,
    payload: newIngredient,
  });
};

export const addFoodToFavorite = foodId => dispatch => {
  dispatch({
    type: ADD_FOOD_TO_FAVORITE,
    payload: foodId,
  });
};

export const removeFoodFromFavorite = foodId => dispatch => {
  dispatch({
    type: REMOVE_FOOD_FROM_FAVORITE,
    payload: foodId,
  });
};

export const addRestaurantToFavorite = restaurantId => dispatch => {
  dispatch({
    type: ADD_RESTAURANT_TO_FAVORITE,
    payload: restaurantId,
  });
};

export const removeRestaurantFromFavorite = restaurantId => dispatch => {
  dispatch({
    type: REMOVE_RESTAURANT_FROM_FAVORITE,
    payload: restaurantId,
  });
};

export const addFoodToBlacklist = foodId => dispatch => {
  dispatch({
    type: ADD_FOOD_TO_BLACKLIST,
    payload: foodId,
  });
};

export const addRestaurantToBlacklist = restaurantId => dispatch => {
  dispatch({
    type: ADD_RESTAURANT_TO_BLACKLIST,
    payload: restaurantId,
  });
};

export const flushLocal = () => dispatch => {
  dispatch({
    type: FLUSH_LOCAL,
    payload: null,
  });
};

export const setDarkTheme = () => dispatch => {
  dispatch({
    type: SET_DARKTHEME,
    payload: null,
  });
};