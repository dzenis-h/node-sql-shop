const Sequelize = require("sequelize");
const sequelizeORM = require("../util/database");

const User = sequelizeORM.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = User;
