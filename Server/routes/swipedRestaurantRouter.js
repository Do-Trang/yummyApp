const express = require('express');
const swipedRestaurantRouter = express.Router();
const SwipedRestaurantController = require('../controllers/SwipedRestaurantController');
const isAuth = require('../middlewares/authenication');

// Route to get all swiped restaurants for a specific user
swipedRestaurantRouter.get('/', isAuth, SwipedRestaurantController.getSwipedRestaurants);

// Route to add a swiped restaurant for a user
swipedRestaurantRouter.post('/', isAuth, SwipedRestaurantController.addSwipedRestaurant);

// Route to delete a swiped restaurant for a user by restaurantId
swipedRestaurantRouter.delete('/:restaurantId', isAuth, SwipedRestaurantController.deleteSwipedRestaurant);

module.exports = swipedRestaurantRouter;