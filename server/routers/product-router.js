const express = require('express');
const router = express.Router();
const {product,getProducts} = require("../controllers/product-controller.js")


router.post("/product", product);
router.get("/getproduct", getProducts);




module.exports = router;
