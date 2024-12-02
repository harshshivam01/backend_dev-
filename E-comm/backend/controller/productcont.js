const Product = require("../models/productModels");

const createProduct = async (req, res) => {
    const { name, description, price, category, rating, image } = req.body;
    try {
        const product = await Product.create({ name, description, price, category, rating, image });
        res.status(201).json({message: "Product created successfully", product});
        
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
        console.log(error);
    }
};
const getAllProducts = async (req, res) => {    
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
 
    const {name, description, price, category, rating, image } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, { name, description, price, category, rating, image }, { new: true });
        res.status(200).json({message: "Product updated successfully", product});
        
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};  

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };