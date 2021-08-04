/**========================================================================
 * *                                auth-user.js
 *   
 *   Exported handler used for authentication of user credentials. Used
 *   in 'routeCallBacks.s'
 *
 *========================================================================**/

'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
  let message;
  let authenticated;
  let user;
  const credentials = auth(req);
  (credentials) 
    ? (user = await User.findOne({
        attributes:
        {
          exclude:[ 'createdAt', 'updatedAt', ]
        },
        where: {
          emailAddress: credentials.name,
        }
      }),
      (user) 
        ? (authenticated = bcrypt.compareSync(credentials.pass, user.password),
          (authenticated)
            ? (req.currentUser = user.toJSON(),
                delete req.currentUser.password)
            :  message = `Authentication failure for username: ${user.emailAddress}!`)
        : message = `User not found for username: ${credentials.name}!`)
    : message = `Auth header not found!`;

  (message)
    ? (console.warn(message),
        res.status(401).json({message: 'Access Denied'}))
    : next();

}