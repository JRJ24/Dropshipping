//const express = require("express");
// const multer = require("multer")
//const path = require("path");
const Product = require("../models/products");

const GetProduct = async (req, res) => {
  try {
    const products = await Product.find();
      res.render('viewProduct', { titulo: 'ViewProduct', products: products });
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
    res.json(product);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error });
  }
};

const SaveProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error){
    res.status(400).json({
      mensaje: "Error al crear producto", error
    })
  }
}

const UpdateProduct = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar producto', error });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar producto', error });
  }
};

module.exports = {
  GetProduct,
  GetProductById,
  SaveProduct,
  UpdateProduct,
  DeleteProduct
};