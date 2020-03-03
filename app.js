const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const db = require("./util/database");

const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const Order = require("./models/order");
const cartItem = require("./models/cart-item");
const orderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1); // dummy user
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: cartItem });
Product.belongsToMany(Cart, { through: cartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: orderItem });

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    // await db.sync({ force: true });
    await db.sync();
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
    const user = await User.findByPk(1);
    if (!user) {
      await User.create({ name: "Dzenis", email: "test@test.com" });
    }
    await user.createCart(); // creating a dummy cart
    return user;
  } catch (error) {
    console.log(error);
  }
})();
