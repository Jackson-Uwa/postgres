const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  phone: {
    type: Sequelize.NUMBER,
  },
});

module.exports = User;
