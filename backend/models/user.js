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
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 255],
        isLowercase: true,
      },
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
  {
    timestamps: true,
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

const hasSecurePassword = function (user) {
  if (user.password != user.confirmPassword)
    throw new Error("Password confirmation doesn't match Password");
};

User.beforeCreate(function (user) {
  if (user.password) return hasSecurePassword(user);
});

User.beforeCreate(async (user) => {
  return await bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      user.confirmPassword = hash;
    })
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
});

User.prototype.correctPassword = function (password, user) {
  return bcrypt.compare(password, user.password);
};

module.exports = User;
