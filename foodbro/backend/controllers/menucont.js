const Menu = require("../models/menu");

const addItem = async (req, res) => {
  console.log('Request user:', req.user);
  console.log('Request body:', req.body);
  console.log('Request params:', req.params);
  
  const { resId } = req.params;
  
  if (!resId) {
    return res.status(400).json({ 
      message: "Restaurant ID is required" 
    });
  }
  
  try {
    const item = await Menu.create({
      ...req.body,
      resId: resId
    });
    
    console.log('Created item:', item);
    res.status(201).json({ 
      status: "success",
      message: "Item added successfully", 
      item 
    });
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ 
      message: "Failed to add item", 
      error: err.message 
    });
  }
};
const foodFilteration = (Menu, payload = {}) => {
  const { searchStr = "", maxPrice = Infinity, rating = 0, discount = 0, vegOnly = false } = payload;
  const search = searchStr.toLowerCase();

  return Menu.filter((food) =>
    (food.name.toLowerCase().includes(search) ||
      food.description.toLowerCase().includes(search) ||
      food.category.toLowerCase().includes(search)) &&
    food.price <= parseFloat(maxPrice) &&
    food.rating >= parseFloat(rating) &&
    food.discountPercentage >= parseFloat(discount) &&
    (!vegOnly || food.isveg)
  );
};

const getAllItems = async (req, res) => {
  const { resId } = req.params;
  console.log('Received resId:', resId);
  
  try {
    const menu = await Menu.find({ resId: resId });
    console.log('Found menu items:', menu);
    
    const data = foodFilteration(menu, {
      searchStr: req.query.searchStr || "",
      maxPrice: req.query.maxPrice || Infinity,
      rating: req.query.rating || 0,
      discount: req.query.discount || 0,
      vegOnly: req.query.vegOnly === "true"
    });
    
    res.status(200).json({ status: "success", food: data });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ 
      message: "Failed to fetch items", 
      error: err.message 
    });
  }
};

const updateItem = async (req, res) => {
  const { name, price, description, category, isveg, image, details, discountPercentage, availableQty } = req.body;
  try {
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, isveg, image, details, discountPercentage, availableQty },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error("Error updating item:", err.stack || err);
    res.status(500).json({ message: "Failed to update item", error: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting item:", err.stack || err);
    res.status(500).json({ message: "Failed to delete item", error: err.message });
  }
};

module.exports = { addItem, getAllItems, updateItem, deleteItem };
