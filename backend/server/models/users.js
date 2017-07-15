'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 1000]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeValidate: function(user, options) {
        const SALT_FACTOR = 10;
          if (!user.changed("password")) {
            return sequelize.Promise.reject("not modified");
          }
        return bcrypt.genSaltAsync(SALT_FACTOR)
        .then((salt) => {
          return bcrypt.hashAsync(user.password, salt, null);
        })
        .then((hash) => {
          user.setDataValue("password", hash);
        })
        .catch((err) => {
          return sequelize.Promise.reject(err);
        })
      }
    }
  });
  return Users;
};
