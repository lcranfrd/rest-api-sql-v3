/**========================================================================
 * *                                courses.js
 *   
 *   Express routes for the courses model. Callbacks for the routes are
 *   defined in 'middleware/routeCallBacks.js. User authentication 
 *   middleware is imported and called in these routes.
 *
 *========================================================================**/

'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user');
const { courses } = require('../controllers/course');


router.get('/', courses.getCourses);
router.get('/:id', courses.getCoursesId);
router.post('/', authenticateUser, courses.postCourses);
router.put('/:id', authenticateUser, courses.putCoursesId);
router.delete('/:id', authenticateUser, courses.deleteCoursesId);

module.exports = router;