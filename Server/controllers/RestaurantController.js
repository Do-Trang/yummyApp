const { 
    addRestaurant, 
    getRestaurantByCriteria, 
    updateRestaurant, 
    deleteRestaurant,
    getMyRestaurant,
    getRestaurantById
} = require('../services/restaurant');

class RestaurantController {
    // @route [POST] /restaurants/add-restaurant
    // @desc Add a new restaurant
    // @access Private
    async addRestaurant(req, res) {
        const userId = req.user_id;
        const { name, address, phone_number, website, description, image_url, rating, tags } = req.body;

        try {
            const result = await addRestaurant(userId, name, address, phone_number, website, description, image_url, rating, tags);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(201).json({
                message: result.message,
                restaurant: result.restaurant
            });
        } catch (error) {
            console.error('Error in addRestaurant:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] /restaurants
    // @desc Get restaurants by search criteria
    // @access Private
    async getRestaurantByCriteria(req, res) {
        const { name, address, tags, minRating } = req.query;

        try {
            const result = await getRestaurantByCriteria(name, address, tags, minRating);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                restaurants: result.restaurants
            });
        } catch (error) {
            console.error('Error in getRestaurantByCriteria:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [PUT] /restaurants/:restaurantId
    // @desc Update restaurant details
    // @access Private
    async updateRestaurant(req, res) {
        const { restaurantId } = req.params;
        const { name, address, phone_number, website, description, image_url, rating, tags } = req.body;

        try {
            const result = await updateRestaurant(restaurantId, name, address, phone_number, website, description, image_url, rating, tags);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                restaurant: result.restaurant
            });
        } catch (error) {
            console.error('Error in updateRestaurant:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] /restaurants/:restaurantId
    // @desc Delete a restaurant
    // @access Private
    async deleteRestaurant(req, res) {
        const { restaurantId } = req.params;

        try {
            const result = await deleteRestaurant(restaurantId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message
            });
        } catch (error) {
            console.error('Error in deleteRestaurant:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] /restaurants/my-restaurants
    // @desc Get all restaurants owned by the current user
    // @access Private
    async getMyRestaurant(req, res) {
        const userId = req.user_id;

        try {
            const result = await getMyRestaurant(userId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                restaurants: result.restaurants
            });
        } catch (error) {
            console.error('Error in getMyRestaurant:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] /restaurants/:restaurantId
    // @desc Get a restaurant by its ID
    // @access Private
    async getRestaurantById(req, res) {
        const { restaurantId } = req.params;

        try {
            const result = await getRestaurantById(restaurantId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                restaurant: result.restaurant
            });
        } catch (error) {
            console.error('Error in getRestaurantById:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new RestaurantController();