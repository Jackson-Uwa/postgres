const Sequelize = require("sequelize");
const db = require("../config/db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
