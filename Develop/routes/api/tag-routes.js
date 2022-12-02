const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{
        model: Product,
      }]
    });
    if(!allTags) {
      res.status(404).json({message: "Tags not found"})
    }
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err)
  }
  
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const allTags = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{
        model: Product,
      }]
    });
    if(!allTags) {
      res.status(404).json({message: "Tag with this id not found"})
    }
    res.status(200).json(allTags)
    } catch (err) {
      res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
    console.log(req.body)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
