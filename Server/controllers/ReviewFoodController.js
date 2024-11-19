const { 
    addReviewFood, 
    deleteReviewFood, 
    getReviewFood 
} = require('../services/review_food');

class FoodReviewController {
    // @route [POST] /reviews/add-review
    // @desc Add or update a review for a food item
    // @access Private
    async addReview(req, res) {
        const userId = req.user_id;
        const { foodId, rating, comment } = req.body;

        try {
            const result = await addReviewFood(userId, foodId, rating, comment);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(201).json({
                message: result.message,
                review: result.review
            });
        } catch (error) {
            console.error('Error in addReview:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] /reviews/:foodId
    // @desc Delete a review for a food item
    // @access Private
    async deleteReview(req, res) {
        const userId = req.user_id;
        const { foodId } = req.params;

        try {
            const result = await deleteReviewFood(userId, foodId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({ message: result.message });
        } catch (error) {
            console.error('Error in deleteReview:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] /reviews/:foodId
    // @desc Get all reviews for a food item
    // @access Private
    async getReviews(req, res) {
        const { foodId } = req.params;

        try {
            const result = await getReviewFood(foodId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                reviews: result.reviews
            });
        } catch (error) {
            console.error('Error in getReviews:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new FoodReviewController();