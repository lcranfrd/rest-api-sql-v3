/**========================================================================+++
 * ?                                                     ABOUT
 * @author         :  L. Bennett Crantford
 * @email          :  lcranfrd@comcast.net
 * @repo           :  https://github.com/lcranfrd/rest-api-sql-v3.git
 * @createdOn      :  8/3/2021
 * @description    :  TExpress/Sequelize/Sqlite-3 API project without HTML
 *                    for TreeHouse FS Techdegree Project #9.
 *=========================================================================+**/

'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const { sequelize } = require('./models/index.js');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//Test DB Connection
(async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database Synced on Start')
  } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
)();

// setup basic routes
app.use('/', routes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
