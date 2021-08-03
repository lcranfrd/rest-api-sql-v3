/**========================================================================
 * *                                users.js
 *   
 *   Express routes for the users model. Callbacks for the routes are
 *   defined in 'middleware/routeCallBacks.js. User authentication 
 *   middleware is imported and called in these routes.
 *   
 *========================================================================**/

'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user');
const { users } = require('../middleware/routeCallBacks');

router.get('/', authenticateUser, users.getUsers);
router.post('/', users.postUsers);

module.exports = router;