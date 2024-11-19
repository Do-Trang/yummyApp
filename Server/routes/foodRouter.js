const express = require('express');
const foodRouter = express.Router();
const FoodController = require('../controllers/FoodController');
const isAuth = require('../middlewares/authenication');

// Route to get foods by search criteria
foodRouter.get('/', isAuth, FoodController.getFoodByCriteria);

// Route to add a new food item
foodRouter.post('/create-foods', isAuth, FoodController.addFood);

// Route to delete a food item by ID
foodRouter.delete('/:foodId', isAuth, FoodController.deleteFood);

// Route to update a food item by ID
foodRouter.put('/:foodId', isAuth, FoodController.updateFood);

// Route to get all food items of the user's restaurants
foodRouter.get('/my-foods', isAuth, FoodController.getMyFood);

module.exports = foodRouter;