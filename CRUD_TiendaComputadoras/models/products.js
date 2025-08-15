const mongoose = require('mongoose');
const productsSchema = mongoose.Schema({
    codigo:{
        type: String,
        required: true
    },
    NombreArticulo:{
        type: String,
        required: true
    },
    Foto:{
        type: String,
        required: true
    },
    Descripción:{
        type: String,
        required: true
    },
    CantidadDisponible:{
        type: int,
        required: true
    },
    Precio:{
        type: Double,
        required: true
    },
    created:{
        type: Date,
        required: true,
        default: Date.now
    },
})
const Product = mongoose.model('Product', productsSchema);

module.exports = Product;