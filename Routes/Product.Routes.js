const express = require("express");
const router = express.Router();

const ProductController = require("../Controllers/Product.Controller");

router.post("/addproduct", ProductController.addProduct);

router.get("/product", ProductController.getProduct);

router.put("/product/update/:Product_id", ProductController.updateProduct);

router.delete("/product/delete/:Product_id", ProductController.deleteProduct);


module.exports = router;
