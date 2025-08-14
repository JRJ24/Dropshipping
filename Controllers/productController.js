
const Product = require("../models/products");

const GetProduct = async (req, res) => {
  try {
    const products = await Product.find();
      res.render('ViewProduct', { titulo: 'ViewProduct', products: products });
  } catch (error){
    res.status(500).json({
      mensaje: "Error al obtener los productos", error
    });
  }
};

const GetProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.render('editProduct', {titulo: 'EditProduct', products: product})
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect('/products/ViewProduct')
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar producto', error });
  }
};

const SaveProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file ? req.file.filename : null 
    });

    await product.save();
    res.redirect("/products/ViewProduct");
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear producto",
      error
    });
  }
};

const ShowDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('DeleteProducts', { titulo: 'Eliminar Producto', product });
  } catch (error) {
    res.status(404).send('Producto no encontrado');
  }
};

const DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/ViewProduct');
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar producto', error });
  }
};

module.exports = {
  GetProduct,
  GetProductById,
  SaveProduct,
  UpdateProduct,
  DeleteProduct,
  ShowDeleteProduct
};