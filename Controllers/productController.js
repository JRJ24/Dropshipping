
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
    res.redirect('/products/ViewProduct');
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar producto', error });
  }
};


const GetStoreProducts = async (req, res) => {
  try {
    const { name = '', category = 'all' } = req.query;
    
    let filter = {};
    
    if (name.trim()) {
      filter.name = { $regex: name, $options: 'i' }; 
    }
    
    if (category !== 'all') {
      filter.category = category;
    }
    const allProducts = await Product.find(filter);

    const categories = await Product.distinct('category');
    
    const productsByCategory = {};
    
    allProducts.forEach(product => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });
    
    res.render('OnlineStore', {
      titulo: 'Tienda Virtual',
      products: productsByCategory,
      categories: categories,
      searchName: name,
      selectedCategory: category
    });
    
  } catch (error) {
    console.error('Error al obtener productos de la tienda:', error);
    res.status(500).json({
      mensaje: "Error al cargar la tienda", 
      error: error.message
    });
  }
};

module.exports = {
  GetProduct,
  GetProductById,
  SaveProduct,
  UpdateProduct,
  DeleteProduct,
  ShowDeleteProduct,
  GetStoreProducts
};