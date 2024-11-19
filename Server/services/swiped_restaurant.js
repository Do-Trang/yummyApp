const { SwipedRestaurant, Restaurant } = require('../db/models');

const getSwipedRestaurants = async (userId) => {
    try {
        const swipedRestaurants = await SwipedRestaurant.findAll({
            where: { 
                user_id: userId,
                swipe_direction: 'right',
            },
            attributes: ['restaurant_id'],
            include: [
                {
                    model: Restaurant,
                    as: 'restaurant',
                    attributes: ['name', 'image_url'],
                }
            ],
        });

        if (swipedRestaurants.length === 0) {
            return { success: false, message: 'No swiped restaurants found for this user.' };
        }

        return {
            success: true,
            message: 'Swiped restaurants retrieved successfully!',
            swipedRestaurants: swipedRestaurants.map(swipe => ({
                name: swipe.restaurantAlias.name,
                image_url: swipe.restaurantAlias.image_url,
                id: swipe.restaurant_id,
            })),
        };
    } catch (error) {
        console.error('Error in getSwipedRestaurants:', error);
        return { success: false, message: 'Error retrieving swiped restaurants.' };
    }
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