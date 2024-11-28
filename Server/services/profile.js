const { User, Follow, SwipedFood, SwipedRestaurant } = require('../db/models');
const bcrypt = require('bcryptjs');

const getMyProfile = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ['user_id', 'username', 'email', 'phone_number', 'dob', 'avatar_url', 'gender', 'address', 'description']
    });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const [
        followersCount,
        followingCount,
        swipedFoodsCount,
        swipedRestaurantsCount
    ] = await Promise.all([
        Follow.count({ where: { followed_id: userId } }),
        Follow.count({ where: { follower_id: userId } }),
        SwipedFood.count({ where: { user_id: userId, swipe_direction: 'right' } }),
        SwipedRestaurant.count({ where: { user_id: userId, swipe_direction: 'right' } })
    ]);

    return {
        success: true,
        message: 'Get user profile successfully!',
        user: {
            ...user.toJSON(),
            followersCount,
            followingCount,
            swipedFoodsCount,
            swipedRestaurantsCount
        }
    };
};

const editUserProfile = async (userId, username, dob, avatar_url, gender, address, description) => {
    const user = await User.findByPk(userId, {
        attributes: ['user_id', 'username', 'dob', 'avatar_url', 'gender', 'address', 'description']
    });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    await User.update(
        { 
            username: username,
            dob: dob,
            avatar_url: avatar_url,
            gender: gender,
            address: address,
            description: description
        },
        { 
            where: {
                user_id: userId
            }
        }
    );

    return {
        success: true,
        message: 'User profile updated successfully.'
    };
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findByPk(userId, {
        attributes: ['user_id', 'password']
    });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    
    if (!isOldPasswordValid) {
        return { success: false, message: 'Old password is incorrect.' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
        { 
            password: hashedPassword 
        },
        { 
            where: { 
                user_id: userId 
            } 
        }
    );

    return {
        success: true,
        message: 'Password changed successfully.'
    };
};

const getUserProfile = async (currentUserId, userId) => {
    const user = await User.findByPk(userId, {
        attributes: ['user_id', 'username', 'email', 'phone_number', 'dob', 'avatar_url', 'gender', 'address', 'last_login', 'description']
    });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const [isFollowingCount, isFollowedByCount] = await Promise.all([
        Follow.count({ where: { follower_id: currentUserId, followed_id: userId } }),
        Follow.count({ where: { follower_id: userId, followed_id: currentUserId } })
    ]);

    let followStatus = '';
    if (isFollowingCount > 0) {
        followStatus = 'follow';
    } else {
        followStatus = 'not follow';
    }

    return {
        success: true,
        message: 'Get user profile successfully!',
        user: {
            ...user.toJSON(),
            followStatus
        }
    };
};

module.exports = {
    getMyProfile,
    editUserProfile,
    changePassword,
    getUserProfile
};

module.exports = {
    getMyProfile,
    editUserProfile,
    changePassword,
    getUserProfile
};