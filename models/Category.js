const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Category extends Model {}

// Category model that creates a category table with a category_name column and a id as primary key column
Category.init(
  {
      category_name:{
      type:DataTypes.STRING,
      allowNull:false
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
