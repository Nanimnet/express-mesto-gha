const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { signupValidation, signinValidation } = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const NotFoundErr = require('./errors/NotFoundErr');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use((req, res, next) => {
  next(new NotFoundErr('Запрашиваемая страница не найдена'));
});

app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
