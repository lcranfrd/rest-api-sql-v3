/**========================================================================
 * *                           async-handler.js
 *   
 *   Exported handler used in 'routeCallBacks.js' for use with sequelize
 *   calls to catch errors.
 *
 *========================================================================**/

'use strict';

exports.asyncHandler = (cb) => {
  return async (req, res, next) => {
    try{
      await cb(req, res, next);
    } catch (error) {
      next(error);
    } 
  }
}