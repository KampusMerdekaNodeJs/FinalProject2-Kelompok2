'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../hellpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "full_name can't be empty!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This email has been used"
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email can't be empty!"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This username has been used"
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username can't be empty!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password can't be empty!"
        }
      }
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "profile_image_url can't be empty!"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "age can't be empty!"
        }
      }
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "phone_number can't be empty!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    }
  });
  return User;
};