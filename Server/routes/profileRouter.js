const express = require('express');
const profileRouter = express.Router();
const ProfileController = require('../controllers/ProfileController');
const isAuth = require('../middlewares/authenication');

// Route to get the current user's profile
profileRouter.get('/', isAuth, ProfileController.getMyProfile);

// Route to edit the current user's profile
profileRouter.post('/edit-profile', isAuth, ProfileController.editUserProfile);

// Route to change the current user's password
profileRouter.put('/change-password', isAuth, ProfileController.changePassword);

// Route to get another user's profile by user ID
profileRouter.get('/:userId', isAuth, ProfileController.getUserProfileHandler);

module.exports = profileRouter;