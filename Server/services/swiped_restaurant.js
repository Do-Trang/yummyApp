const { SwipedRestaurant } = require('../db/models');

const getSwipedRestaurants = async (userId) => {
    const swipedRestaurants = await SwipedRestaurant.findAll({
        where: { user_id: userId },
        attributes: ['swipe_id', 'restaurant_id', 'swipe_direction'],
    });

    if (swipedRestaurants.length === 0) {
        return { success: false, message: 'No swiped restaurants found for this user.' };
    }

    return {
        success: true,
        message: 'Swiped restaurants retrieved successfully!',
        swipedRestaurants: swipedRestaurants.map(swipe => swipe.toJSON()),
    };
};

const addSwipedRestaurant = async (userId, restaurantId, swipeDirection) => {
    const newSwipe = await SwipedRestaurant.create({
        user_id: userId,
        restaurant_id: restaurantId,
        swipe_direction: swipeDirection,
    });

    return {
        success: true,
        message: 'Swiped restaurant added successfully!',
        swipe: newSwipe.toJSON(),
    };
};

const deleteSwipedRestaurant = async (userId, restaurantId) => {
    const deletedSwipe = await SwipedRestaurant.destroy({
        where: {
            user_id: userId,
            restaurant_id: restaurantId
        },
    });

    if (deletedSwipe === 0) {
        return { success: false, message: 'No swiped restaurant found with the given user_id and restaurant_id.' };
    }

    return {
        success: true,
        message: 'Swiped restaurant deleted successfully!',
    };
};

module.exports = {
    getSwipedRestaurants,
    addSwipedRestaurant,
    deleteSwipedRestaurant
}