const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



//getroute that finds all the tags in the tag table
//includes product information that is related to the tag as well using junction associations with product_tag table
router.get('/', (req, res) => {
  Tag.findAll({
    include:{ 
      model:Product,
    }
  }) .then((data) => {
      res.status(200).json(data);
  })
  .catch((err) => console.log(err));
});

// get route that takes in a param to find the index tag
//includes production information that is related to the tag using junction association with product_tag
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id,{  
    include:{ 
      model:Product,
    }
  }) .then((data) => {
      res.status(200).json(data);
  })
  .catch((err) => console.log(err));
});

//post route that creates a new tag with data from the body in the post request
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((data) => {
      return res.status(200).json(data);
  })
  .catch((err) => console.log(err));
});

//put route that takes in a param and then updates the indexed tag with the data in the body that was in the put request
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name:req.body.tag_name,
  },{
     where:{
         id:req.params.id
     }
  }).then(data=>{
     if(data[0]){
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

//delete route that takes in a param and deletes the indexed tag
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
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
