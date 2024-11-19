const { 
    followUser, 
    unfollowUser,
    deleteFollower,
    getFollowers,
    getFollowings
} = require('../services/relation');

class RelationController {
    // @route [POST] relations/follow/:followedId
    // @desc Follow a user
    // @access Private
    async follow(req, res) {
        const followerId = req.user_id;
        const { followedId } = req.params;

        try {
            const result = await followUser(followerId, followedId);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }

            return res.status(201).json({ message: result.message });
        } catch (error) {
            console.error('Error in follow:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] relations/unfollow/:followedId
    // @desc Unfollow a user
    // @access Private
    async unfollow(req, res) {
        const followerId = req.user_id;
        const { followedId } = req.params;

        try {
            const result = await unfollowUser(followerId, followedId);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }

            return res.status(200).json({ message: result.message });
        } catch (error) {
            console.error('Error in unfollow:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [DELETE] relations/deleteFollow/:followerId
    // @desc Delete a follow relationship.
    // @access Private
    async deleteFollow(req, res) {
        const followedId = req.user_id;
        const { followerId } = req.params;

        try {
            const result = await deleteFollower(followedId, followerId);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }

            return res.status(200).json({ message: result.message });
        } catch (error) {
            console.error('Error in delete follow:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] relations/followers/
    // @desc Get the list of followers
    // @access Private
    async getFollowers(req, res) {
        const userId = req.user_id;
        console.log(1)

        try {
            const result = await getFollowers(userId);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error('Error in getFollowers:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // @route [GET] relations/followings/
    // @desc Get the list of followings
    // @access Private
    async getFollowings(req, res) {
        const userId = req.user_id;

        try {
            const result = await getFollowings(userId);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error('Error in getFollowings:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new RelationController();
