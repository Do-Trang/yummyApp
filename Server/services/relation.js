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

module.exports = {
    followUser,
    unfollowUser
};