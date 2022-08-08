const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.error(err);
    res.json({ status: "failed", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.json({
      status: "success",
      data: {
        user,
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
    const user = await User.create(req.body);
    res.json({
      status: "success",
      newUser: {
        user,
      },
    });
  } catch (err) {
    res.json({ status: "failed", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.update(req.body, {
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
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({ status: "failed", err: error.message });
  }
});

module.exports = router;
