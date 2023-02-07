const router = require('express').Router();
const { Product, Category, Tag, ProductTag} = require('../../models');


// get route that returns all the products in the product table
// it includes the category detail by using the category_id and associating it to the primary id in category table
// also includes tag detail but junction table by using product_id and tag_id 
router.get('/', (req, res) => {
  Product.findAll({
    include:[Category,Tag],
    exclude: ['categoryId']
  }) .then((data) => {
      res.status(200).json(data);
  })
  .catch((err) => console.log(err));
});

// get route that takes in a param and returns one products in the product table at the index
// it includes the category detail by using the category_id and associating it to the primary id in category table
// also includes tag detail but junction table by using product_id and tag_id 
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id,{ 
    include:[Category,Tag]
  }) .then((data) => {
      res.status(200).json(data);
  })
  .catch((err) => console.log(err));  
});

// post route that creates a new product with the information passed into the body of the post request
// it then checks if theres anythign in the tag if so then it creates and product_tag entry
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//put route that takes in a param and data from the body that updates a product
//then it finds all associate tag from product_tag and compares which tag isnt in the updated product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

//delete route that takes in a param and delete that product in the index. 
router.delete('/:id', (req, res) => {
  Product.destroy({
    where:{
        id:req.params.id
    }
  }).then(data=>{
      if(data){
          return res.json(data)
      } else {
          return res.status(404).json({msg:"no such record"})
      }
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"an error occurred",
          err:err
      })
  })
});

module.exports = router;
