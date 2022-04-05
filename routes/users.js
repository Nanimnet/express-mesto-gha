const users = require('express').Router();

const {
  createUser,
  getUserById,
  getUsers,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

users.post('/', createUser);
users.get('//:userId', getUserById);
users.get('/', getUsers);
users.patch('/me', updateUserInfo);
users.patch('/me/avatar', updateAvatar);

module.exports = users;