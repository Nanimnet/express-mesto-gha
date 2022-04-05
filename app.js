const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.error('Нет соединения с mongodb', err);
  } else {
    console.log('Подключено к mongodb');
  }
});

app.use((req, res, next) => {
  req.user = {
    _id: '624c90ad6940783c840f4971'
  };

  next();
});

app.post('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get("/", (req, res) => {
  res.status(200).send({ hello: "world!" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});