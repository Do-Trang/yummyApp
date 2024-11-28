const express = require('express');
const restaurantRouter = express.Router();
const RestaurantController = require('../controllers/RestaurantController');
const isAuth = require('../middlewares/authenication');

// Route to add a new restaurant
restaurantRouter.post('/add-restaurant', isAuth, RestaurantController.addRestaurant);

// Route to get restaurants by search criteria
restaurantRouter.get('/', isAuth, RestaurantController.getRestaurantByCriteria);

// Route to update restaurant details by restaurantId
restaurantRouter.put('/:restaurantId', isAuth, RestaurantController.updateRestaurant);

// Route to delete a restaurant by restaurantId
restaurantRouter.delete('/:restaurantId', isAuth, RestaurantController.deleteRestaurant);

// Route to get all restaurants owned by the current user
restaurantRouter.get('/my-restaurants', isAuth, RestaurantController.getMyRestaurant);

// Route to get a specific restaurant by restaurantId
restaurantRouter.get('/:restaurantId', isAuth, RestaurantController.getRestaurantById);

module.exports = restaurantRouter;
