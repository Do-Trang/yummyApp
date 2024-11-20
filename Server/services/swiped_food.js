const { SwipedFood, Food } = require('../db/models');

const getSwipedFoods = async (userId) => {
    const swipedFoods = await SwipedFood.findAll({
        where: {
            user_id: userId,
            swipe_direction: 'right',
        },
        attributes: ['food_id'],
        include: [
            {
                model: Food,
                as: 'food',
                attributes: ['name', 'image_url'],
            }
        ],
    });

    if (swipedFoods.length === 0) {
        return { success: false, message: 'No swiped foods found for this user.' };
    }

    return {
        success: true,
        message: 'Swiped foods retrieved successfully!',
        swipedFoods: swipedFoods.map(swipe => ({
            name: swipe.food.name,
            image_url: swipe.Food.image_url,
            id: swipe.food_id,
        })),
    };
};

const addSwipedFood = async (userId, foodId, swipeDirection) => {
    const existingSwipe = await SwipedFood.findOne({
        where: {
            user_id: userId,
            food_id: foodId,
        },
    });

    if (existingSwipe) {
        const updatedSwipe = await SwipedFood.update(
            { swipe_direction: swipeDirection },
            { where: { user_id: userId, food_id: foodId } }
        );

        return {
            success: true,
            message: 'Swiped food successfully!',
            swipe: updatedSwipe.toJSON(),
        };
    } else {
        const newSwipe = await SwipedFood.create({
            user_id: userId,
            food_id: foodId,
            swipe_direction: swipeDirection,
        });

        return {
            success: true,
            message: 'Swiped food successfully!',
            swipe: newSwipe.toJSON(),
        };
    }
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