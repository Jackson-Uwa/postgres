const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const APIFeatures = require("../utils/APIFeatures");

router.get("/", async (req, res) => {
  try {
    // const features = new APIFeatures(Product.findAll(), req.query)
    //   .filter()
    //   .sort()
    //   .fields()
    //   .paginate();
    // const products = await features.query;
    const products = await Product.findAll();
    res.json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.json({
      status: "failed",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.json({
      status: "failed",
      error: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      status: "success",
      newProduct: {
        product,
      },
    });
  } catch (error) {
    res.json({
      status: "failed",
      err: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.update(req.body, {
      where: {
        id: id,
      },
    });
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "failed",
      err: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "failed",
      err: error.message,
    });
  }
});

module.exports = router;
