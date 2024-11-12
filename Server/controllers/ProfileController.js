const { 
    getMyProfile, 
    editUserProfile,
    changePassword,
    getUserProfile
} = require('../services/profile');

class ProfileController {
    // @route [GET] /profile
    // @desc Get user profile by user ID
    // @access Private
    async getMyProfile(req, res) {
        const userId = req.user_id;

        const result = await getMyProfile(userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({
            message: result.message,
            user: result.user
        });
    }

    // @route [POST] /edit-profile
    // @desc Edit user profile by user ID
    // @access Private
    async editUserProfile(req, res) {
        const userId = req.user_id;
        const { username, dob, avatar_url, gender, address, description } = req.body;

        const result = await editUserProfile(userId, username, dob, avatar_url, gender, address, description);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({
            message: result.message
        });
    }

    // @route [PUT] /profile/change-password
    // @desc Change user password
    // @access Private
    async changePassword(req, res) {
        const userId = req.user_id;
        const { oldPassword, newPassword } = req.body;

        const result = await changePassword(userId, oldPassword, newPassword);

        if (!result.success) {
            if (result.message === 'User not found.') {
                return res.status(404).json({ message: result.message });
            }
            if (result.message === 'Old password is incorrect.') {
                return res.status(400).json({ message: result.message });
            }
        }

        return res.status(200).json({
            message: result.message
        });
    }

    // @route [GET] /profile/:userId
    // @desc Get profile of another user by their user ID
    // @access Private
    async getUserProfileHandler(req, res) {
        const currentUserId = req.user_id;
        const { userId } = req.params;

        const result = await getUserProfile(currentUserId, userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({
            message: result.message,
            user: result.user
        });
    }
}

module.exports = new ProfileController();