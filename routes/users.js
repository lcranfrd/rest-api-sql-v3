'use strict';

const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/async-handler');
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const sequelizeErrors = [
  'SequelizeValidationError',
  'SequelizeUniqueConstraintError'
];
let errors;

router.get('/', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.json({
    user,
  });
}));

router.post('/', asyncHandler( async (req, res) => {
  try{
    await User.create(req.body);
    res.status(201);
  } catch (error) {
    if(sequelizeErrors.some(v => v === error.name)) {
      errors = error.errors.map(err => err.message) || res.status(400).json({ errors });
    } else {
      throw error;
    }
  } 
}));

module.exports = router;