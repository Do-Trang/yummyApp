const { User, Follow } = require('../db/models');

const followUser = async (followerId, followedId) => {
    const follower = await User.findByPk(followerId);
    const followed = await User.findByPk(followedId);

    if (!follower || !followed) {
        return { success: false, message: 'User not found.' };
    }

    const existingFollow = await Follow.findOne({
        where: {
            follower_id: followerId,
            followed_id: followedId
        }
    });

    if (existingFollow) {
        return { success: false, message: 'Already following this user.' };
    }

    await Follow.create({
        follower_id: followerId,
        followed_id: followedId
    });

    return {
        success: true,
        message: 'Followed user successfully.'
    };
};

const unfollowUser = async (followerId, followedId) => {
    const follower = await User.findByPk(followerId);
    const followed = await User.findByPk(followedId);

    if (!follower || !followed) {
        return { success: false, message: 'User not found.' };
    }

    const existingFollow = await Follow.findOne({
        where: {
            follower_id: followerId,
            followed_id: followedId
        }
    });

    if (!existingFollow) {
        return { success: false, message: 'You are not following this user.' };
    }

    await Follow.destroy({
        where: {
            follower_id: followerId,
            followed_id: followedId
        }
    });

    return {
        success: true,
        message: 'Unfollowed user successfully.'
    };
};

const deleteFollower = async (followedId, followerId) => {
    const follower = await User.findByPk(followerId);
    const followed = await User.findByPk(followedId);

    if (!follower || !followed) {
        return { success: false, message: 'User not found.' };
    }

    const existingFollow = await Follow.findOne({
        where: {
            follower_id: followerId,
            followed_id: followedId
        }
    });

    if (!existingFollow) {
        return { success: false, message: 'No follow relationship found to delete.' };
    }

    await Follow.destroy({
        where: {
            follower_id: followerId,
            followed_id: followedId
        }
    });

    return {
        success: true,
        message: 'Follow relationship deleted successfully.'
    };
};

const getFollowers = async (userId) => {
    try {
        const followers = await Follow.findAll({
            where: {
                followed_id: userId
            },
            include: [{
                model: User,
                as: 'follower',
                attributes: ['user_id', 'username', 'avatar_url']
            }]
        });

        if (followers.length === 0) {
            return { success: false, message: 'No followers found.' };
        }

        const followerDetails = followers.map(follow => ({
            id: follow.follower.user_id,
            username: follow.follower.username,
            avatar_url: follow.follower.avatar_url
        }));

        return {
            success: true,
            message: 'Followers retrieved successfully.',
            followers: followerDetails
        };
    } catch (error) {
        console.error('Error in getFollowers:', error);
        return { success: false, message: 'Internal server error.' };
    }
};

const getFollowings = async (userId) => {
    try {
        const followings = await Follow.findAll({
            where: {
                follower_id: userId
            },
            include: [{
                model: User,
                as: 'followed',
                attributes: ['user_id', 'username', 'avatar_url']
            }]
        });

        if (followings.length === 0) {
            return { success: false, message: 'No followings found.' };
        }

        const followingDetails = followings.map(follow => ({
            id: follow.followed.user_id,
            username: follow.followed.username,
            avatar_url: follow.followed.avatar_url
        }));

        return {
            success: true,
            message: 'Followings retrieved successfully.',
            followings: followingDetails
        };
    } catch (error) {
        console.error('Error in getFollowings:', error);
        return { success: false, message: 'Internal server error.' };
    }
};

module.exports = {
    followUser,
    unfollowUser,
    deleteFollower,
    getFollowers,
    getFollowings
};