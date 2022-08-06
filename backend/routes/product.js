const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.send(err);
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = Product.create(req.body);
    res.json({
      status: "success",
      newProduct: {
        product,
      },
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
  }
});

module.exports = router;
