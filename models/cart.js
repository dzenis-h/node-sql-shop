const Sequelize = require("sequelize");
const sequelizeORM = require("../util/database");

const Cart = sequelizeORM.define("Cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

module.exports = Cart;
