const Sequelize = require("sequelize");
const sequelizeORM = require("../util/database");

const Order = sequelizeORM.define("Order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

module.exports = Order;
