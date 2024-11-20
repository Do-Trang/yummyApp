const { 
    getFoodByCriteria, 
    addFood, 
    deleteFood, 
    updateFood,
    getMyFood 
} = require('../services/food');

class FoodController {
    // @route [GET] /foods
    // @desc Get foods by search criteria
    // @access Private
    async getFoodByCriteria(req, res) {
        const { name, minPrice, maxPrice, tags, minRating } = req.body;

        try {
            const result = await getFoodByCriteria(name, minPrice, maxPrice, tags, minRating);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                food: result.food
            });
        } catch (error) {
            console.error('Error in getFoodByCriteria:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [POST] /foods/create-foods
    // @desc Add a new food item
    // @access Private
    async addFood(req, res) {
        const userId = req.user_id;
        const { name, description, price, image_url, rating, tags, restaurant_name } = req.body;
    
        try {
            const result = await addFood(userId, name, description, price, image_url, rating, tags, restaurant_name);
    
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
    
            return res.status(201).json({
                message: result.message,
                food: result.food
            });
        } catch (error) {
            console.error('Error in addFood:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] /foods/:foodId
    // @desc Delete a food item by ID
    // @access Private
    async deleteFood(req, res) {
        const { foodId } = req.params;

        try {
            const result = await deleteFood(foodId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message
            });
        } catch (error) {
            console.error('Error in deleteFood:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [PUT] /foods/:foodId
    // @desc Update a food item by ID
    // @access Private
    async updateFood(req, res) {
        const { foodId } = req.params;
        const { name, description, price, restaurant_name, image_url, rating, tags } = req.body;

        try {
            const result = await updateFood(foodId, name, description, price, restaurant_name, image_url, rating, tags);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                food: result.food
            });
        } catch (error) {
            console.error('Error in updateFood:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] /foods/my-foods
    // @desc Get all food items of the user's restaurants
    // @access Private
    async getMyFood(req, res) {
        const userId = req.user_id;

        try {
            const result = await getMyFood(userId);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            return res.status(200).json({
                message: result.message,
                foods: result.foods
            });
        } catch (error) {
            console.error('Error in getMyFood:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = new FoodController();