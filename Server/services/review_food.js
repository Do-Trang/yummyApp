const { Food, ReviewFood, User } = require('../db/models');

const updateFoodRatings = async (foodId) => {
    const reviews = await ReviewFood.findAll({
        where: { food_id: foodId },
        attributes: ['rating'],
    });

    if (reviews.length === 0) {
        return;
    }

    let totalDelicious = 0, totalPresentation = 0, totalPrice = 0, totalFresh = 0;
    let count = 0;

    reviews.forEach(review => {
        const rating = JSON.parse(review.rating);

        totalDelicious += rating.food_rating_delicious || 0;
        totalPresentation += rating.food_rating_presentation || 0;
        totalPrice += rating.food_rating_price || 0;
        totalFresh += rating.food_rating_fresh || 0;
        count++;
    });

    const avgDelicious = (totalDelicious / count).toFixed(1);
    const avgPresentation = (totalPresentation / count).toFixed(1);
    const avgPrice = (totalPrice / count).toFixed(1);
    const avgFresh = (totalFresh / count).toFixed(1);

    const roundedAvgDelicious = parseFloat(avgDelicious);
    const roundedAvgPresentation = parseFloat(avgPresentation);
    const roundedAvgPrice = parseFloat(avgPrice);
    const roundedAvgFresh = parseFloat(avgFresh);

    await Food.update(
        {
            rating: JSON.stringify({
                food_rating_delicious: roundedAvgDelicious,
                food_rating_presentation: roundedAvgPresentation,
                food_rating_price: roundedAvgPrice,
                food_rating_fresh: roundedAvgFresh,
            }),
        },
        { where: { food_id: foodId } }
    );
};


const addReviewFood = async (userId, foodId, rating, comment) => {
    const ratingString = JSON.stringify(rating);

    const existingReview = await ReviewFood.findOne({
        where: {
            user_id: userId,
            food_id: foodId,
        }
    });

    if (existingReview) {
        await ReviewFood.update(
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

        await updateFoodRatings(foodId);

        const updatedReview = await ReviewFood.findByPk(existingReview.id);

        return {
            success: true,
            message: 'Review updated successfully!',
            review: updatedReview.toJSON(),
        };
    } else {
        const newReview = await ReviewFood.create({
            user_id: userId,
            food_id: foodId,
            rating: ratingString,
            comment: comment,
        });

        await updateFoodRatings(foodId);

        return {
            success: true,
            message: 'Review added successfully!',
            review: newReview.toJSON(),
        };
    }
};

const deleteReviewFood = async (userId, foodId) => {
    const review = await ReviewFood.findOne({
        where: {
            user_id: userId,
            food_id: foodId,
        }
    });

    if (!review) {
        return {
            success: false,
            message: 'Review not found for this user and food.',
        };
    }

    await ReviewFood.destroy({
        where: {
            user_id: userId,
            food_id: foodId,
        }
    });

    await updateFoodRatings(foodId)

    return {
        success: true,
        message: 'Review deleted successfully.',
    };
};

const getReviewFood = async (foodId) => {
    const reviews = await ReviewFood.findAll({
        where: {
            food_id: foodId
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
            message: 'No reviews found for this food.',
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
    addReviewFood,
    deleteReviewFood,
    getReviewFood,
};