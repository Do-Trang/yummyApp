const { 
    getSwipedRestaurants, 
    addSwipedRestaurant, 
    deleteSwipedRestaurant 
} = require('../services/swiped_restaurant');

class SwipedRestaurantController {
    // @route [GET] /swiped-restaurants
    // @desc Get all swiped restaurants for a specific user
    // @access Private
    async getSwipedRestaurants(req, res) {
        const userId = req.user_id;

        try {
            const result = await getSwipedRestaurants(userId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                swipedRestaurants: result.swipedRestaurants,
            });
        } catch (error) {
            console.error('Error in getSwipedRestaurants:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [POST] /swiped-restaurants
    // @desc Add a swiped restaurant for a user
    // @access Private
    async addSwipedRestaurant(req, res) {
        const userId = req.user_id;
        const { restaurantId, swipeDirection } = req.body;

        try {
            const result = await addSwipedRestaurant(userId, restaurantId, swipeDirection);

            return res.status(201).json({
                message: result.message,
                swipe: result.swipe,
            });
        } catch (error) {
            console.error('Error in addSwipedRestaurant:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] /swiped-restaurants/:restaurantId
    // @desc Delete a swiped restaurant for a user
    // @access Private
    async deleteSwipedRestaurant(req, res) {
        const userId = req.user_id;
        const { restaurantId } = req.params;

        try {
            const result = await deleteSwipedRestaurant(userId, restaurantId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
            });
        } catch (error) {
            console.error('Error in deleteSwipedRestaurant:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SwipedRestaurantController();