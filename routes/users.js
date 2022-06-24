const users = require('express').Router();

const { userIdValidation, userInfoValidation, userAvatarValidation } = require('../middlewares/validation');

const {
  getUserById,
  getUsers,
  updateUserInfo,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

users.get('/:userId', userIdValidation, getUserById);
users.get('/', getUsers);
users.get('/me', getCurrentUser);
users.patch('/me', userInfoValidation, updateUserInfo);
users.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = users;
