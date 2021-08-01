'use strict';

const express = require('express');
const router = express.Router();
const message = 'Welcome to the REST API project!';

const basicRoute = (req, res) => {
  res.json({
    message,
  });
}

router.get('/', basicRoute);
router.get('/api', basicRoute);

module.exports = router;