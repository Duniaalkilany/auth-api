'use strict';

const foodModel = (sequelize, DataTypes) => sequelize.define('Food-class8', {
  name: { type: DataTypes.STRING, required: true },
  calories: { type: DataTypes.STRING, required: true },
  type: { type: DataTypes.ENUM('fruit', 'vegetable', 'protein'), required: true }
});

module.exports = foodModel;