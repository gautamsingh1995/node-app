'use strict';
const {
  Model
} = require('sequelize');
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
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    otp: {
      type: DataTypes.STRING, // You can adjust the data type as needed
      allowNull: true, // Modify this based on your requirements
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};