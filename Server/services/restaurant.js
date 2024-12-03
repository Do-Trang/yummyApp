const { Restaurant, Sequelize, User } = require('../db/models');
const Op = Sequelize.Op;

const getRestaurantByCriteria = async (name = '', address = '', tags = [], minRating = null) => {
    const whereConditions = {};

    if (name) {
        whereConditions.name = {
            [Op.iLike]: `%${name}%`
        };
    }

    if (address) {
        whereConditions.address = {
            [Op.iLike]: `%${address}%`
        };
    }

    if (tags.length > 0) {
        whereConditions.tags = {
            [Op.overlap]: tags
        };
    }

    if (minRating) {
        if(minRating.restaurant_rating_food) {
            whereConditions["restaurant_rating_food"] = {
                [Op.gte]: minRating.restaurant_rating_food
            }
        }
        if(minRating.restaurant_rating_service) {
            whereConditions["restaurant_rating_service"] = {
                [Op.gte]: minRating.restaurant_rating_service
            }
        }
        if(minRating.restaurant_rating_price) {
            whereConditions["restaurant_rating_price"] = {
                [Op.gte]: minRating.restaurant_rating_price
            }
        }
        if(minRating.restaurant_rating_decoration) {
            whereConditions["restaurant_rating_decoration"] = {
                [Op.gte]: minRating.restaurant_rating_decoration
            }
        }
    }

    const restaurants = await Restaurant.findAll({
        where: whereConditions,
        attributes: ['restaurant_id', 'name', 'address', 'phone_number', 'website', 'description', 'image_url', 'rating', 'tags'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['user_id', 'username']
            }
        ]
    });

    if (restaurants.length === 0) {
        return { success: false, message: 'No restaurants found matching the criteria.' };
    }

    return {
        success: true,
        message: 'Restaurants found successfully!',
        restaurants: restaurants.map(restaurant => {
            const restaurantData = restaurant.toJSON();
            if (restaurantData.user) {
                restaurantData.user_id = restaurantData.user.user_id;
                restaurantData.username = restaurantData.user.username;
            }

            return restaurantData;
        })
    };
};

const addRestaurant = async (userId, name, address, phone_number, website, description, image_url, rating, tags) => {

    const newRestaurant = await Restaurant.create({
        user_id: userId,
        name: name,
        address: address,
        phone_number: phone_number,
        website: website,
        description: description,
        image_url: image_url,
        rating: rating,
        tags: tags
    });

    return {
        success: true,
        message: 'Restaurant added successfully!',
        restaurant: newRestaurant.toJSON()
    };
};

const updateRestaurant = async (restaurantId, name, address, phone_number, website, description, image_url, rating, tags) => {
    const restaurant = await Restaurant.findOne({
        where: { restaurant_id: restaurantId }
    });

    if (!restaurant) {
        return { success: false, message: 'Restaurant not found or you are not the owner.' };
    }

    const updatedRating = rating ? JSON.stringify(rating) : restaurant.rating;

    await Restaurant.update(
        {
            name: name || restaurant.name,
            address: address || restaurant.address,
            phone_number: phone_number || restaurant.phone_number,
            website: website || restaurant.website,
            description: description || restaurant.description,
            image_url: image_url || restaurant.image_url,
            rating: updatedRating,
            tags: tags || restaurant.tags
        },
        {
            where: { restaurant_id: restaurantId }
        }
    );

    const updatedRestaurant = await Restaurant.findOne({
        where: { restaurant_id: restaurantId }
    });

    return {
        success: true,
        message: 'Restaurant updated successfully!',
        restaurant: updatedRestaurant.toJSON()
    };
};

const deleteRestaurant = async (restaurantId) => {
    const restaurant = await Restaurant.findOne({
        where: { restaurant_id: restaurantId },
        attributes: ['restaurant_id']
    });

    if (!restaurant) {
        return { success: false, message: 'Restaurant not found.' };
    }

    await Restaurant.destroy({
        where: { restaurant_id: restaurantId }
    });

    return { success: true, message: 'Restaurant deleted successfully!' };
};

const getMyRestaurant = async (userId) => {
    try {
        const restaurants = await Restaurant.findAll({
            where: { user_id: userId },
            attributes: [
                'restaurant_id', 
                'name', 
                'address', 
                'phone_number', 
                'website', 
                'description', 
                'image_url', 
                'rating', 
                'tags'
            ]
        });

        if (restaurants.length === 0) {
            return { success: false, message: 'No restaurants found for this user.' };
        }

        return {
            success: true,
            message: 'Restaurants retrieved successfully!',
            restaurants: restaurants.map(restaurant => restaurant.toJSON())
        };
    } catch (error) {
        console.error('Error in getMyRestaurant:', error);
        return { success: false, message: 'Error retrieving restaurants.' };
    }
};

const getRestaurantById = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: { restaurant_id: restaurantId },
            attributes: ['restaurant_id', 'name', 'address', 'phone_number', 'website', 'description', 'image_url', 'rating', 'tags']
        });

        if (!restaurant) {
            return { success: false, message: 'Restaurant not found.' };
        }

        const restaurantData = restaurant.toJSON();
        console.log(restaurantData)

        return {
            success: true,
            message: 'Restaurant details retrieved successfully!',
            restaurant: restaurantData
        };
    } catch (error) {
        console.error('Error in getRestaurantById:', error);
        return { success: false, message: 'Error retrieving restaurant details.' };
    }
}

module.exports = {
    addRestaurant,
    deleteRestaurant,
    getRestaurantByCriteria,
    updateRestaurant,
    getMyRestaurant,
    getRestaurantById
}