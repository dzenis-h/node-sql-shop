const Sequelize = require("sequelize");
const sequelizeORM = require("../util/database");

const OrderItem = sequelizeORM.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;
