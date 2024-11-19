const express = require('express');
const swipedFoodRouter = express.Router();
const SwipedFoodController = require('../controllers/SwipedFoodController');
const isAuth = require('../middlewares/authenication');

// Route to get all swiped foods for a specific user
swipedFoodRouter.get('/', isAuth, SwipedFoodController.getSwipedFoods);

// Route to add a swiped food for a user
swipedFoodRouter.post('/', isAuth, SwipedFoodController.addSwipedFood);

// Route to delete a swiped food for a user by foodId
swipedFoodRouter.delete('/:foodId', isAuth, SwipedFoodController.deleteSwipedFood);

module.exports = swipedFoodRouter;