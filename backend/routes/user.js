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
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne(id);
    res.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.json({
      status: "failed",
      err,
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
    res.send(err);
  }
});

module.exports = router;
