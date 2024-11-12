const { Restaurant, Sequelize } = require('../db/models');
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
        whereConditions.rating = {
            [Op.contains]: JSON.stringify({
                "restaurant_rating_food": minRating,
                "restaurant_rating_service": minRating,
                "restaurant_rating_price": minRating,
                "restaurant_rating_decoration": minRating
            })
        };
    }

    const restaurants = await Restaurant.findAll({
        where: whereConditions,
        attributes: ['restaurant_id', 'name', 'address', 'phone_number', 'website', 'description', 'image_url', 'rating', 'tags']
    });

    if (restaurants.length === 0) {
        return { success: false, message: 'No restaurants found matching the criteria.' };
    }

    return {
        success: true,
        message: 'Restaurants found successfully!',
        restaurants: restaurants.map(restaurant => restaurant.toJSON())
    };
};

const addRestaurant = async (userId, name, address, phone_number, website, description, image_url, rating, tags) => {
    const formattedRating = rating ? JSON.stringify(rating) : null;

    const newRestaurant = await Restaurant.create({
        user_id: userId,
        name: name,
        address: address,
        phone_number: phone_number,
        website: website,
        description: description,
        image_url: image_url,
        rating: formattedRating,
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

module.exports = {
    addRestaurant,
    deleteRestaurant,
    getRestaurantByCriteria,
    updateRestaurant
}