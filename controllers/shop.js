const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  // Sequelize method:
  try {
    const prods = await Product.findAll();
    res.render("shop/product-list", {
      prods,
      pageTitle: "All Products",
      path: "/products"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
  // MySQL way of doing things:
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/product-list', {
  //       prods: rows,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
};

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getIndex = async (req, res, next) => {
  // Sequelize method:
  try {
    const prods = await Product.findAll();
    res.render("shop/index", {
      prods,
      pageTitle: "Shop",
      path: "/"
    });
  } catch (error) {
    console.log(error);
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    // both of these methods were added by Sequelize ORM
    const cart = await req.user.getCart();
    const prods = await cart.getProducts();
    // console.log(prods[0].cartItem.quantity);
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: prods
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;
  let newQuantity = 1;
  let product;
  try {
    const prod = await Product.findByPk(productId);
    const cart = await req.user.getCart();
    const cartProds = await cart.getProducts({ where: { id: productId } }); // will return an array
    if (cartProds[0]) {
      // ... we want to increase the qunitity
      product = cartProds[0];
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    }
    await cart.addProduct(prod, { through: { quantity: newQuantity } });
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const cart = await req.user.getCart();
    const prods = await cart.getProducts({ where: { id: productId } });
    await prods[0].cartItem.destroy();
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postCreateOrder = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const prods = await cart.getProducts();
    const order = await req.user.createOrder();
    const fixedProds = prods.map(p => {
      p.orderItem = { quantity: p.cartItem.quantity };
      return p;
    });

    await order.addProducts(fixedProds);
    await cart.setProducts(null);

    res.redirect("/orders");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  const orders = await req.user.getOrders({ include: ["Products"] });
  console.log(orders);
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
