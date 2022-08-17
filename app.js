const express = require('express');

const app = express();

const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.use('/sales', salesRoute);

module.exports = app;