const { 
    getSwipedFoods, 
    addSwipedFood, 
    deleteSwipedFood 
} = require('../services/swiped_food');

class SwipedFoodController {
    // @route [GET] /swiped-foods
    // @desc Get all swiped foods for a specific user
    // @access Private
    async getSwipedFoods(req, res) {
        const userId = req.user_id;

        try {
            const result = await getSwipedFoods(userId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                swipedFoods: result.swipedFoods,
            });
        } catch (error) {
            console.error('Error in getSwipedFoods:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [POST] /swiped-foods
    // @desc Add a swiped food for a user
    // @access Private
    async addSwipedFood(req, res) {
        const userId = req.user_id;
        const { foodId, swipeDirection } = req.body;

        try {
            const result = await addSwipedFood(userId, foodId, swipeDirection);

            return res.status(201).json({
                message: result.message,
                swipe: result.swipe,
            });
        } catch (error) {
            console.error('Error in addSwipedFood:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] /swiped-foods/:foodId
    // @desc Delete a swiped food for a user
    // @access Private
    async deleteSwipedFood(req, res) {
        const userId = req.user_id;
        const { foodId } = req.params;

        try {
            const result = await deleteSwipedFood(userId, foodId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
            });
        } catch (error) {
            console.error('Error in deleteSwipedFood:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SwipedFoodController();