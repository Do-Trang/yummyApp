const { Food, Sequelize, Restaurant, User } = require('../db/models');
const Op = Sequelize.Op;

const getFoodByCriteria = async (name = '', minPrice = null, maxPrice = null, tags = [], minRating = null) => {
    const whereConditions = {};

    if (name) {
        whereConditions.name = {
            [Op.iLike]: `%${name}%`
        };
    }

    if (minPrice || maxPrice) {
        whereConditions.price = {};
        if (minPrice) {
            whereConditions.price[Op.gte] = minPrice;
        }
        if (maxPrice) {
            whereConditions.price[Op.lte] = maxPrice;
        }
    }

    if (tags.length > 0) {
        whereConditions.tags = {
            [Op.overlap]: tags
        };
    }

    if (minRating) {
        if (minRating.food_rating_delicious) {
            whereConditions['rating.food_rating_delicious'] = {
                [Op.gte]: minRating.food_rating_delicious
            };
        }
        if (minRating.food_rating_presentation) {
            whereConditions['rating.food_rating_presentation'] = {
                [Op.gte]: minRating.food_rating_presentation
            };
        }
        if (minRating.food_rating_price) {
            whereConditions['rating.food_rating_price'] = {
                [Op.gte]: minRating.food_rating_price
            };
        }
        if (minRating.food_rating_fresh) {
            whereConditions['rating.food_rating_fresh'] = {
                [Op.gte]: minRating.food_rating_fresh
            };
        }
    }

    const foods = await Food.findAll({
        where: whereConditions,
        include: [
            {
                model: Restaurant,
                as: 'restaurant',
                attributes: ['name', 'address']
            },
            {
                model: User,
                as: 'user',
                attributes: ['user_id', 'username']
            }
        ],
        attributes: ['food_id', 'name', 'description', 'price', 'image_url', 'rating', 'tags']
    });

    if (foods.length === 0) {
        return { success: false, message: 'No food found matching the criteria.' };
    }

    return {
        success: true,
        message: 'Foods found successfully!',
        food: foods.map(food => {
            const foodData = food.toJSON();
            
            foodData.restaurantName = foodData.restaurant.name;
            foodData.restaurantAddress = foodData.restaurant.address;
            foodData.user_id = foodData.user.user_id;
            foodData.username = foodData.user.username;
            return foodData;
        })
    };
};

const addFood = async (userId, name, description, price, image_url, rating, tags, restaurant_name) => {
    let restaurant = await Restaurant.findOne({
        where: { name: restaurant_name, user_id: userId },
        attributes: ['restaurant_id']
    });

    if (!restaurant) {
        return { success: false, message: 'Restaurant does not exist, please add the restaurant first.' };
    }

    const newFood = await Food.create({
        user_id: userId,
        name: name,
        description: description,
        price: price,
        image_url: image_url,
        rating: JSON.stringify(rating),
        tags: tags,
        restaurant_id: restaurant.restaurant_id
    });

    return {
        success: true,
        message: 'Food added successfully!',
        food: newFood.toJSON()
    };
};

const deleteFood = async (foodId) => {
    const food = await Food.findOne({
        where: { food_id: foodId },
        attributes: ['food_id']
    });

    if (!food) {
        return { success: false, message: 'Food not found.' };
    }

    await Food.destroy({
        where: { food_id: foodId }
    });

    return { success: true, message: 'Food deleted successfully!' };
};

const updateFood = async (foodId, name, description, price, restaurant_name, image_url, rating, tags) => {
    const food = await Food.findOne({
        where: { food_id: foodId }
    });

    if (!food) {
        return { success: false, message: 'Food not found.' };
    }

    const restaurant = await Restaurant.findOne({
        where: { name: restaurant_name },
        attributes: ['restaurant_id']
    });

    if (!restaurant) {
        return { success: false, message: 'Restaurant not found. Please add the restaurant before updating food.' };
    }

    await Food.update(
        {
            name: name || food.name,
            description: description || food.description,
            price: price || food.price,
            image_url: image_url || food.image_url,
            rating: rating ? JSON.stringify(rating) : food.rating,
            tags: tags || food.tags,
            restaurant_id: restaurant.restaurant_id
        },
        {
            where: { food_id: foodId }
        }
    );

    const updatedFood = await Food.findOne({
        where: { food_id: foodId }
    });

    return {
        success: true,
        message: 'Food updated successfully!',
        food: updatedFood.toJSON()
    };
};

const getMyFood = async (userId) => {
    try {
        const foods = await Food.findAll({
            where: { user_id: userId },
            attributes: ['food_id', 'name', 'description', 'price', 'image_url', 'rating', 'tags']
        });

        if (foods.length === 0) {
            return { success: false, message: 'No food found for this user.' };
        }

        return {
            success: true,
            message: 'Foods retrieved successfully!',
            foods: foods.map(food => {
                const foodData = food.toJSON();
                if (foodData.rating) {
                    foodData.rating = JSON.parse(foodData.rating);
                }
                return foodData;
            })
        };
    } catch (error) {
        console.error('Error in getMyFood:', error);
        return { success: false, message: 'Error retrieving foods.' };
    }
};

const getFoodById = async (foodId) => {
    try {
        const food = await Food.findOne({
            where: { food_id: foodId },
            include: [
                {
                    model: Restaurant,
                    as: 'restaurant',
                    attributes: ['name', 'address']
                }
            ],
            attributes: ['food_id', 'name', 'description', 'price', 'image_url', 'rating', 'tags']
        });

        if (!food) {
            return { success: false, message: 'Food not found.' };
        }

        const foodData = food.toJSON();

        foodData.restaurantName = foodData.restaurant.name;
        foodData.restaurantAddress = foodData.restaurant.address;
        console.log(foodData)

        return {
            success: true,
            message: 'Food details retrieved successfully!',
            food: foodData
        };
    } catch (error) {
        console.error('Error in getFoodById:', error);
        return { success: false, message: 'Error retrieving food details.' };
    }
};


module.exports = {
    getFoodByCriteria,
    addFood,
    deleteFood,
    updateFood,
    getMyFood,
    getFoodById
};