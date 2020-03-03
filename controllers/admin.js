const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  try {
    // we saved the 'user' to the req.user
    // Magic? -> The ORM will automaticlly create a 'create' function depending on our Model name
    // Since our model is called 'Product', a function like 'createProduct' will be available on our req.user object

    await req.user.createProduct({
      title,
      imageUrl,
      price,
      description
      //   UserId: req.user.id // this will be automaticlly added
    });

    //  Old way of doing it:
    // await Product.create({
    //   title,
    //   imageUrl,
    //   price,
    //   description,
    //   UserId: req.user.id
    // });
    res.redirect("/");
    console.log("Product has been saved.");
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const { edit } = req.query;
  const { productId } = req.params;
  if (!edit) {
    return res.redirect("/");
  }
  try {
    const prod = await Product.findByPk(productId);
    if (!productId) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: edit,
      product: prod
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  try {
    const updatedProduct = await Product.findByPk(productId);
    updatedProduct.title = title;
    updatedProduct.price = price;
    updatedProduct.imageUrl = imageUrl;
    updatedProduct.description = description;
    await updatedProduct.save();
    console.log("Product has been updated.");
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  const prods = await Product.findAll();
  res.render("admin/products", {
    prods,
    pageTitle: "Admin Products",
    path: "/admin/products"
  });
};

exports.postDeleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const prod = await Product.findByPk(productId);
    await prod.destroy();
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
