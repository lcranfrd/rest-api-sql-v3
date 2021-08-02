'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
      validate: {
        notNull: {
          msg: 'First Name is required!',
        },
        notEmpty: {
          msg: 'Please provide a First Name!'
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last Name is required!',
        },
        notEmpty: {
          msg: 'Please provide a Last Name!',
        },
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email Record already exists',
      },
      validate: {
        notNull: {
          msg: 'Email address is required!',
        },
        notEmpty: {
          msg: 'Please provide an Email Address!',
        },
        isEmail: {
          msg: 'Email must be in valid formation',
        },
      }
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
          msg: 'The password needs to be between 6 and 30 characters in length!',
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