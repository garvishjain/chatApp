'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RegistrationUser extends Model {
    static associate(models) {}
  }

  RegistrationUser.init(
    {
      registrationid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileno: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      address:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    { sequelize, modelName: 'registrationusers' },
  );

  return RegistrationUser;
};