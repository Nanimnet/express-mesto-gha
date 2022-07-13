const { celebrate, Joi } = require('celebrate');

const validateUrl = (value, helpers) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!regex.test(value)) {
    return helpers.error('Ссылка не валидна');
  }
  return value;
};

module.exports.userIdValidation = celebrate({
  params: Joi
    .object()
    .keys({
      userId: Joi.string().hex().length(24),
    }),
});

module.exports.userInfoValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30).required(),
    }),
});

module.exports.userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signinValidation = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

module.exports.cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateUrl),
  }),
});

module.exports.idValidation = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().max(24).required(),
  }),
});
