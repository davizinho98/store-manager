const express = require('express');

const app = express();

const productsRoute = require('./routes/productsRoute');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

module.exports = app;