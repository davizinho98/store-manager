const express = require('express');

const router = express.Router();

router.get('/', (_request, response) => {
  response.status(200).end();
});

router.get('/:id', (_request, response) => {
  response.status(200).end();
});

module.exports = router;