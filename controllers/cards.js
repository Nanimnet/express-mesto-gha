const Card = require('../models/card');

const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');
const NotFoundErr = require('../errors/NotFoundErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Данные не верны'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundErr('Карточка не найдена'))
    .then((data) => {
      if (data.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenErr('Нельзя удалить чужую карточку');
      }
      return data.remove();
    })
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundErr('Карточка не найдена'));
      }
      return res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundErr('Карточка не найдена'));
      }
      return res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Переданы некорректные данные'));
      }
      return next(err);
    });
};
