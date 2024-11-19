const express = require('express');
const restaurantReviewRouter = express.Router();
const RestaurantReviewController = require('../controllers/ReviewRestaurantController');
const isAuth = require('../middlewares/authenication');

// Route to add or update a review for a restaurant
restaurantReviewRouter.post('/restaurant-reviews', isAuth, RestaurantReviewController.addReview);

// Route to delete a review for a restaurant
restaurantReviewRouter.delete('/restaurant-reviews/:restaurantId', isAuth, RestaurantReviewController.deleteReview);

// Route to get all reviews for a restaurant
restaurantReviewRouter.get('/restaurant-reviews/:restaurantId', isAuth, RestaurantReviewController.getReviews);

module.exports = restaurantReviewRouter;