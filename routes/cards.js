const cards = require('express').Router();

const { cardValidation, idValidation } = require('../middlewares/validation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cards.get('/cards', getCards);
cards.post('/cards', cardValidation, createCard);
cards.delete('/cards/:cardId', idValidation('cardId'), deleteCard);
cards.put('/cards/:cardId/likes', idValidation('cardId'), likeCard);
cards.delete('/cards/:cardId/likes', idValidation('cardId'), dislikeCard);

module.exports = cards;
