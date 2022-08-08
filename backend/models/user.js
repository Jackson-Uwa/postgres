const bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

// User.addHook.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// User.beforeCreate((user, options) => {
//   const hashedPassword = bcrypt.hash(user.password, 12);
//   user.password = hashedPassword;
//   user.confirmPassword = undefined;
// });

// User.beforeCreate((user, options) => {
//   user.password === user.confirmPassword;
// });

module.exports = User;
