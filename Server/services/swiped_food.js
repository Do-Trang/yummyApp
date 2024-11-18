const { SwipedFood } = require('../db/models');

const getSwipedFoods = async (userId) => {
    const swipedFoods = await SwipedFood.findAll({
        where: { user_id: userId },
        attributes: ['swipe_id', 'food_id', 'swipe_direction'],
    });

    if (swipedFoods.length === 0) {
        return { success: false, message: 'No swiped foods found for this user.' };
    }

    return {
        success: true,
        message: 'Swiped foods retrieved successfully!',
        swipedFoods: swipedFoods.map(swipe => swipe.toJSON()),
    };
};

const addSwipedFood = async (userId, foodId, swipeDirection) => {
    const newSwipe = await SwipedFood.create({
        user_id: userId,
        food_id: foodId,
        swipe_direction: swipeDirection,
    });

    return {
        success: true,
        message: 'Swiped food added successfully!',
        swipe: newSwipe.toJSON(),
    };
};

const deleteSwipedFood = async (userId, foodId) => {
    const deletedSwipe = await SwipedFood.destroy({
        where: {
            user_id: userId,
            food_id: foodId
        },
    });

    if (deletedSwipe === 0) {
        return { success: false, message: 'No swiped food found with the given user_id and food_id.' };
    }

    return {
        success: true,
        message: 'Swiped food deleted successfully!',
    };
};

module.exports = {
    getSwipedFoods,
    deleteSwipedFood,
    addSwipedFood
}