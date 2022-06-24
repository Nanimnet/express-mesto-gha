const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { signupValidation, signinValidation } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errors');

const NotFoundErr = require('./errors/NotFoundErr');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
