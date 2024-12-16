const express = require("express");
const {  getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart, } = require("../controllers/cartCont");
const { checkAuth } = require("../middlewares/auth");
const router = express.Router();

router.use(checkAuth);
router.post("/create", addToCart);
router.get("/get/:userId", getCart);
router.put("/update/:userId", updateCartItem);
router.delete("/delete/:userId", removeCartItem);
router.delete("/clear/:userId", clearCart);

module.exports = router;


