const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
      const products = await Product.findAll();
      res.json(products);
  } catch (err) {
      res.status(500).json(err);
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
  } catch (err) {
      res.status(500).json(err);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
  } catch (err) {
      res.status(400).json(err);
  }
});

// PUT to update a product by ID
router.put('/:id', async (req, res) => {
  try {
      const updatedProduct = await Product.update(req.body, {
          where: {
              id: req.params.id,
          },
      });
      if (!updatedProduct[0]) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product updated successfully' });
  } catch (err) {
      res.status(400).json(err);
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
      const deletedProduct = await Product.destroy({
          where: {
              id: req.params.id,
          },
      });
      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;