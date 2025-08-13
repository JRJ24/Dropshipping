const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path");
const Product = require("../models/products");
const { GetProduct,
GetProductById,
SaveProduct,
UpdateProduct,
DeleteProduct } = require("../Controllers/productController");
const { render } = require("ejs");


router.get('/ViewProduct', GetProduct);
router.get('/:id', GetProductById)
router.post('/', SaveProduct);
router.put('/:id', UpdateProduct);
router.delete('/:id', DeleteProduct);

module.exports = router;