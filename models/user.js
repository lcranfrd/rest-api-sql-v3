'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('.');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password value is required!',
        },
        notEmpty: {
          msg: 'Please enter a password!',
        },
        len: {
          args: [6, 30],
          msg: 'The password needs to be between 6 and 30 characters in length!'
        },
      },
    }
  },
    { sequelize,
      modelName: 'User',
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Course, {
      // as: '',
      // foreignKey: {
      //   fieldName: '',
      //   field: '',
      //   allowNull: false,
      // },
      onDelete: 'cascade',
    });
  }
  return User;
}