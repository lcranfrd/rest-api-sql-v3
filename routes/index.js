'use strict';

const express = require('express');
const router = express.Router();
const message = 'Welcome to the REST API project!';

router.get('/', (req, res) => {
  res.json({
    message,
  });
});

router.get('/api', (req, res) => {
  res.json({
    message,
  });
});

module.exports = router;