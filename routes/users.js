const users = require('express').Router();

const { userIdValidation, userInfoValidation, userAvatarValidation } = require('../middlewares/validation');

const {
  getUserById,
  getUsers,
  updateUserInfo,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

users.get('/users', getUsers);
users.get('/users/me', getCurrentUser);
users.get('/users/:userId', userIdValidation, getUserById);
users.patch('/users/me', userInfoValidation, updateUserInfo);
users.patch('/users/me/avatar', userAvatarValidation, updateAvatar);

module.exports = users;
