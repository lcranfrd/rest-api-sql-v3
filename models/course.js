'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
    },
    description: {
      type: DataTypes.TEXT,
    },
    estimatedTime: {
      type: DataTypes.STRING,
    },
    materials: {
      type: DataTypes.STRING,
    },
  },
    {
       sequelize, modelName: 'Course',
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      // as: '',
      // foreignKey: {
      //   fieldName: '',
      //   field: '',
      //   allowNull: false,
      // },
      onDelete: 'cascade',
    });
  }
  return Course;
}