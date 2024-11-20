const express = require('express');
const foodReviewRouter = express.Router();
const FoodReviewController = require('../controllers/ReviewFoodController');
const isAuth = require('../middlewares/authenication');

// Route to add or update a review for a food item
foodReviewRouter.post('/reviews/add-review', isAuth, FoodReviewController.addReview);

// Route to delete a review for a food item
foodReviewRouter.delete('/reviews/:foodId', isAuth, FoodReviewController.deleteReview);

// Route to get all reviews for a food item
foodReviewRouter.get('/reviews/:foodId', isAuth, FoodReviewController.getReviews);

module.exports = foodReviewRouter;