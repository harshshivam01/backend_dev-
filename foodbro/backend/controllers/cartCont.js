const Cart = require("../models/cartModel"); // Adjust the path based on your project structure


/**
 * Get the user's cart
 */
const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `req.user` contains authenticated user info
    const cart = await Cart.findOne({ user: userId }).populate("items.user");
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Add an item to the cart
 */
const addToCart = async (req, res) => {
    console.log(req.body);
    console.log(req.user);
    console.log(req.user.id);
  
    const { productId, quantity } = req.body;
  
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid productId or quantity" });
    }
  
    try {
      const userId = req.user.id; // Assuming `req.user` contains authenticated user info
  
      // Find the cart for the user
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        // If cart doesn't exist, create a new one
        cart = new Cart({ user: userId, items: [], totalPrice: 0 });
      }
  
      // Check if the item already exists in the cart
      const existingItem = cart.items.find(
        (item) => item._id.toString() === productId
      );
  
      if (existingItem) {
        // If item exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If it's a new item, add it to the cart
        cart.items.push({ user: userId, _id: productId, quantity });
      }
  
      // Calculate the price for the item (you will need to implement this function)
      const itemPrice = await calculatePrice(productId, quantity);  // Assume calculatePrice is async and fetches product price
  
      // Update the total price of the cart
      cart.totalPrice += itemPrice;
  
      // Save the updated cart
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
/**
 * Update an item's quantity in the cart
 */
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item._id.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.totalPrice += (quantity - item.quantity) * calculatePrice(productId, 1);
    item.quantity = quantity;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Remove an item from the cart
 */
const removeCartItem = async (req, res) => {
  const { productId } = req.body;

  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const removedItem = cart.items[itemIndex];
    cart.totalPrice -= calculatePrice(removedItem._id, removedItem.quantity);
    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Clear the cart
 */
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Helper function to calculate the price of an item
 * Replace this with your actual pricing logic
 */
const calculatePrice = (productId, quantity) => {
  // Mock logic; replace with actual product lookup
  const pricePerItem = 10; // Example price
  return pricePerItem * quantity;
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
