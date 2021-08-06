'use strict';

const { User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler')
const sequelizeErrors = [
  'SequelizeValidationError',
  'SequelizeUniqueConstraintError'
];

const users = {
  getUsers: asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.json({
      user,
    });
  }),

  postUsers: asyncHandler( async (req, res) => {
    try{
      await User.create(req.body);
      res.location('/').status(201).end();
    } catch (error) {
      if(sequelizeErrors.some(v => v === error.name)) {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    } 
  }),
}

module.exports = { users };