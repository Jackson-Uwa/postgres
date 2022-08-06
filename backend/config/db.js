const { Sequelize } = require("sequelize");

module.exports = new Sequelize("test", "postgres", "jayjay952", {
  host: "localhost",
  port: 5433,
  dialect: "postgres",
  // operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
