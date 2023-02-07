// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//associations that connects tables together
//product and category connects with each other via category_id and categorie's primary ID

//junction table created for product and tags using the product_tag table 

Product.belongsTo(Category,{foreignKey:"category_id"});
Category.hasMany(Product);
Product.belongsToMany(Tag,{
  through:"product_tag",
  foreignKey: "product_id"
});
Tag.belongsToMany(Product,{
  through:"product_tag",
  foreignKey: "tag_id"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
