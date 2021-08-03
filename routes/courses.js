'use strict';

var express = require('express');
var router = express.Router();
const { Course, User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const sequelizeErrors = [
  'SequelizeValidationError',
  'SequelizeUniqueConstraintError'
];

router.get('/', asyncHandler( async (req, res) => {
  const courses = await Course.findAll({
    include:
    [
      {
        model: User,
        attributes:
        [
          'lastName',
          'firstName',
          'emailAddress',
        ]
      }
    ]
  });
  res.status(200).json({ courses })
}));

router.get('/:id', asyncHandler( async (req, res) => {
  const course = await Course.findOne({
    where:
      {
        id: req.params.id
      },
    include: 
      [
        {
          model: User,
          attributes: [
            'lastName',
            'firstName',
            'emailAddress',
          ]
        }
      ]
  });
  res.status(200).json({ course })
}));

router.post('/', authenticateUser, asyncHandler(async (req, res) => {
  try{
    if(req.currentUser.id === req.body.userId) {
     const course = await Course.create(req.body,
        {fields:
          [
            'userId',
            'title',
            'description',
            'materialsNeeded',
          ]
        },
      );
      res.location('/api/course/' + course.id).status(201).end();
    } else {
      res.status(400).end();
    }
  } catch (error) {
    if(sequelizeErrors.some(v => v === error.name)) {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  } 
}));

router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
  let course;
  try {
    course = await Course.findByPk(req.params.id);
    if(course.userId === req.currentUser.id) {
      await course.update(req.body);
      res.status(204).end();
    } else {
      res.status(403).end();
    }
  } catch (error) {
    if(sequelizeErrors.some(v => v === error.name)) {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

router.delete('/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  if(course) {
    if(req.currentUser.Id === course.userId) {
      await course.destroy()
      res.status(204).end();
    } else {
      res.status(403).end();
    }
  } else{
    res.status(404).json({message: 'Entry Not Found'});
  }
}));

module.exports = router;