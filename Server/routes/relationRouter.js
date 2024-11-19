const express = require('express');
const relationRouter = express.Router();
const RelationController = require('../controllers/RelationController');
const isAuth = require('../middlewares/authenication');

// Route to follow a user by followedId
relationRouter.post('/follow/:followedId', isAuth, RelationController.follow);

// Route to unfollow a user by followedId
relationRouter.delete('/unfollow/:followedId', isAuth, RelationController.unfollow);

// Route to delete a follow (remove someone from following you)
relationRouter.delete('/deleteFollow/:followerId', isAuth, RelationController.deleteFollow);

// Route to get the list of followers of the authenticated user
relationRouter.get('/followers', isAuth, RelationController.getFollowers);

// Route to get the list of users that the authenticated user is following
relationRouter.get('/followings', isAuth, RelationController.getFollowings);

module.exports = relationRouter;