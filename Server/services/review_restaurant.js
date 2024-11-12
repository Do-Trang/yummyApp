const { Restaurant, ReviewRestaurant, User } = require('../db/models');

const updateRestaurantRatings = async (restaurantId) => {
    const reviews = await ReviewRestaurant.findAll({
        where: { restaurant_id: restaurantId },
        attributes: ['rating'],
    });

    if (reviews.length === 0) {
        return;
    }

    let totalService = 0, totalPrice = 0, totalFood = 0, totalDecoration = 0;
    let count = 0;

    reviews.forEach(review => {
        const rating = JSON.parse(review.rating);

        totalService += rating.restaurant_rating_service || 0;
        totalPrice += rating.restaurant_rating_price || 0;
        totalFood += rating.restaurant_rating_food || 0;
        totalDecoration += rating.restaurant_rating_decoration || 0;
        count++;
    });

    const avgService = (totalService / count).toFixed(1);
    const avgPrice = (totalPrice / count).toFixed(1);
    const avgFood = (totalFood / count).toFixed(1);
    const avgDecoration = (totalDecoration / count).toFixed(1);

    const roundedAvgService = parseFloat(avgService);
    const roundedAvgPrice = parseFloat(avgPrice);
    const roundedAvgFood = parseFloat(avgFood);
    const roundedAvgDecoration = parseFloat(avgDecoration);

    await Restaurant.update(
        {
            rating: JSON.stringify({
                restaurant_rating_service: roundedAvgService,
                restaurant_rating_price: roundedAvgPrice,
                restaurant_rating_food: roundedAvgFood,
                restaurant_rating_decoration: roundedAvgDecoration,
            }),
        },
        { where: { restaurant_id: restaurantId } }
    );
};

const addReviewRestaurant = async (userId, restaurantId, rating, comment) => {
    const ratingString = JSON.stringify(rating);

    const existingReview = await ReviewRestaurant.findOne({
        where: {
            user_id: userId,
            restaurant_id: restaurantId
        }
    });

    if (existingReview) {
        await ReviewRestaurant.update(
            {
                rating: ratingString,
                comment: comment
            },
            {
                where: {
                    id: existingReview.id
                }
            }
        );

        await updateRestaurantRatings(restaurantId);

        const updatedReview = await ReviewRestaurant.findByPk(existingReview.id);

        return {
            success: true,
            message: 'Review updated successfully!',
            review: updatedReview.toJSON(),
        };
    } else {
        const newReview = await ReviewRestaurant.create({
            user_id: userId,
            restaurant_id: restaurantId,
            rating: ratingString,
            comment: comment,
        });

        await updateRestaurantRatings(restaurantId);

        return {
            success: true,
            message: 'Review added successfully!',
            review: newReview.toJSON(),
        };
    }
};

const deleteReviewRestaurant = async (userId, restaurantId) => {
    const review = await ReviewRestaurant.findOne({
        where: {
            user_id: userId,
            restaurant_id: restaurantId,
        }
    });

    if (!review) {
        return {
            success: false,
            message: 'Review not found for this user and restaurant.',
        };
    }

    await ReviewRestaurant.destroy({
        where: {
            user_id: userId,
            restaurant_id: restaurantId,
        }
    });

    await updateRestaurantRatings(restaurantId);

    return {
        success: true,
        message: 'Review deleted successfully.',
    };
};

const getReviewRestaurant = async (restaurantId) => {
    const reviews = await ReviewRestaurant.findAll({
        where: {
            restaurant_id: restaurantId
        },
        attributes: ['rating', 'comment', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username'],
            }
        ]
    });

    if (reviews.length === 0) {
        return {
            success: false,
            message: 'No reviews found for this restaurant.',
        };
    }

    return {
        success: true,
        message: 'Reviews retrieved successfully!',
        reviews: reviews.map(review => {
            const reviewData = review.toJSON();
            return {
                ...reviewData,
                user_name: review.User.username,
            };
        }),
    };
};

module.exports = {
    addReviewRestaurant,
    deleteReviewRestaurant,
    getReviewRestaurant,
};