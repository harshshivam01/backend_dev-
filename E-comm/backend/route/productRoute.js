
const express = require("express");
const productRouter = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controller/productcont");

productRouter.post("/create", createProduct);
productRouter.get("/all", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;

