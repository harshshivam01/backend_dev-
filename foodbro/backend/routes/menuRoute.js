const express = require('express');
const {addItem, getAllItems, deleteItem, updateItem} = require("../controllers/menucont");
const giveAccess = require("../middlewares/access");
const { checkAuth } = require("../middlewares/auth");
const menuRouter = express.Router();

// Apply authentication middleware to all routes
menuRouter.use(checkAuth);

menuRouter
  .route("/:resId")
  .get( getAllItems)
  .post(giveAccess(["admin", "superadmin"]), addItem);

menuRouter
  .route("/item/:id")
  .patch(giveAccess(["admin", "superadmin"]), updateItem)
  .delete(giveAccess(["admin", "superadmin"]), deleteItem);

module.exports = menuRouter;