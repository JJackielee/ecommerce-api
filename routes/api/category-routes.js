const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//category get route that returns all the category in json data
router.get('/', (req, res) => {
  Category.findAll({
    include:[{
      model:Product
    }]
  }) .then((data) => {
      res.status(200).json(data);
  })
  .catch((err) => console.log(err));
});
// get route that uses an id as a param to get an indexed category 
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id,{  
    include:[{
      model:Product
    }]
  }) .then((data) => {
      res.status(200).json(data);
  })
  .catch((err) => console.log(err));
});

// post route that creates a new category using data that was passed in the body of the post request
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((data) => {
        return res.status(200).json(data);
    })
    .catch((err) => console.log(err));
});

// put route that takes in a param and data from body from put request to update the category at the index
router.put('/:id', (req, res) => {
  Category.update({
    category_name:req.body.category_name,
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

// delete route that takes in a param and delete that index(id) in the category table
router.delete('/:id', (req, res) => {
    Category.destroy({
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
