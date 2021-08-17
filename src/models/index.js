

'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('../models/clothes/model.js');
const foodModel = require('../models/food/model.js');
const userModel = require('./users');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL||'postgres://localhost:5432/dunia';
// const DATABASE_URL = process.env.DATABASE_URL 

const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};