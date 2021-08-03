/**========================================================================
 * *                                courses.js
 *   
 *   Model definition for Course instance. 
 *
 *========================================================================**/

'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model{}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required!',
        },
        notEmpty: {
          msg: 'Please provide a Course Title!',
        },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required!',
        },
        notEmpty: {
          msg: 'Please provide a Course Description!',
        },
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
    },
    materialsNeeded: {
      type: DataTypes.STRING,
    },
  },
    {
       sequelize, modelName: 'Course',
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      // as: 'userId',
      foreignKey: {
        fieldName: 'userId',
        field: 'userId',
        allowNull: false,
      },
      notNull: {
        msg: 'Your userId is Required!',
      },
      notEmpty: {
        msg: 'Your userId must not be empty!',
      },
      onDelete: 'cascade',
    });
  }
  return Course;
}