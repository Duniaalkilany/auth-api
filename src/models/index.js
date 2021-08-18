

'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('../models/clothes/model.js');
const foodModel = require('../models/food/model.js');
const userModel = require('./users');
const Collection = require('./data-collection.js');

//const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
  const DATABASE_URL = "postgres://qqhlpkbnxxmgmq:0c4f0a8a6e46c29001d872853e486544302337d9ca59e11805a2a7a96ed82118@ec2-54-76-249-45.eu-west-1.compute.amazonaws.com:5432/d783q5ti95dbr0"

let sequelizeOptions = {
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
};


const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);


const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};
