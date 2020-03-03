const Sequelize = require("sequelize");
const sequelizeORM = require("../util/database");

const CartItem = sequelizeORM.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
