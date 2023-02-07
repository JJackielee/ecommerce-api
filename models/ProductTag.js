const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}
//producttag model that creates a junction table that has the columns product_id(int), tag_id(int), and id as primary key column 

ProductTag.init(
  {
    id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id : {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    tag_id : {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
