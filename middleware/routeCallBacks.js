/**========================================================================
 * *                                routeCallBacks.js
 *   
 *   Exports { users, courses } callbacks for express routes defined in
 *   routes/courses.js and routes/users.js. These are separated from the
 *   route definitions for ease of reading.
 *
 *========================================================================**/

'use strict';

const { User, Course } = require('../models');
const { asyncHandler } = require('./async-handler')
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

const courses = {

  getCourses: asyncHandler( async (req, res) => {
    const courses = await Course.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', ]
      },
      include:
      [
        {
          model: User,
          attributes: [ 'lastName', 'firstName', 'emailAddress', ]
        }
      ]
    });
    res.status(200).json({ courses })
  }),

  getCoursesId: asyncHandler( async (req, res) => {
    const course = await Course.findOne({
      where:
        { id: req.params.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', ]
      },
      include: 
        [
          {
            model: User,
            attributes: [ 'lastName','firstName','emailAddress', ]
          }
        ]
    });
    res.status(200).json({ course })
  }),

  postCourses: asyncHandler(async (req, res) => {
    try{
      if(req.currentUser) {
        req.body.userId = req.currentUser.id;
        const course = await Course.create(req.body,
          {fields: [ 'userId', 'title', 'description', 'materialsNeeded', ]
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
  }),

  putCoursesId: asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.findByPk(req.params.id);
      (course.userId === req.currentUser.id)
        ? await course.update(req.body) && res.status(204).end()
        : res.status(403).end();
    } catch (error) {
      if(sequelizeErrors.some(v => v === error.name)) {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  }),

  deleteCoursesId: asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if(course) {
      (req.currentUser.id === course.userId)
        ? await course.destroy() && res.status(204).end()
        : res.status(403).end();
    } else {
      res.status(404).json({message: 'Entry Not Found'});
    }
  }),

}

module.exports = { users, courses };