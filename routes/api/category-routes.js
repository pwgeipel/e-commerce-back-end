const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      include: [{
        model: Product,
      }]
    });
    if(!allCategories) {
      res.status(404).json({message: "Categories not found"})
    }
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findByPk(req.params.id,{
      include: [{
        model: Product,
      }]
    });
    if(!allCategories) {
      res.status(404).json({message: "Category with this id not found"})

    }
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
    console.log(req.body)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;