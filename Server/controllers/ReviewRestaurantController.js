const { 
    addReviewRestaurant, 
    deleteReviewRestaurant, 
    getReviewRestaurant 
} = require('../services/restaurantReview');

class RestaurantReviewController {
    // @route [POST] /restaurant-reviews
    // @desc Add or update a review for a restaurant
    // @access Private
    async addReview(req, res) {
        const userId = req.user_id;
        const { restaurantId, rating, comment } = req.body;

        try {
            const result = await addReviewRestaurant(userId, restaurantId, rating, comment);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(201).json({
                message: result.message,
                review: result.review,
            });
        } catch (error) {
            console.error('Error in addReview:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] /restaurant-reviews/:restaurantId
    // @desc Delete a review for a restaurant
    // @access Private
    async deleteReview(req, res) {
        const userId = req.user_id;
        const { restaurantId } = req.params;

        try {
            const result = await deleteReviewRestaurant(userId, restaurantId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({ message: result.message });
        } catch (error) {
            console.error('Error in deleteReview:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] /restaurant-reviews/:restaurantId
    // @desc Get all reviews for a restaurant
    // @access Private
    async getReviews(req, res) {
        const { restaurantId } = req.params;

        try {
            const result = await getReviewRestaurant(restaurantId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                reviews: result.reviews,
            });
        } catch (error) {
            console.error('Error in getReviews:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new RestaurantReviewController();