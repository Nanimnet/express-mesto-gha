const users = require('express').Router();

const {
  createUser,
  getUserById,
  getUsers,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

users.post('/users', createUser);
users.get('/users/:userId', getUserById);
users.get('/users', getUsers);
users.patch('/users/me', updateUserInfo);
users.patch('/users/me/avatar', updateAvatar);

module.exports = users;