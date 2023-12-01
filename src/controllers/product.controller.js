// import path from 'path'
// import { param } from "express-validator";
import ProductModel from "../model/product.model.js";

export default class ProductController {
  getProduct(req, res, next) {
    let products = ProductModel.getAll();
    return res.render("products.ejs", { products: products , userEmail: req.session.userEmail});
  }

  // renderinng add page
  getAddForm(req, res, next) {
    return res.render("new-product.ejs", {
      errorMessage: null, userEmail: req.session.userEmail 
    });
  }
  // adding the product info in model
 addNewProduct(req, res, next) {
    //  code to add data into model and render the page
    const { name, desc, price } = req.body;
    const imageUrl = 'images/' + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    let products =  ProductModel.getAll();
    return res.render("products.ejs", { products , userEmail: req.session.userEmail });
  }

  getUpdateProductView(req, res, next) {
    // 1. If product exist return view .

    // const { id } = req.body;
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail 
      });
    }
    // 2.else return ERRORS
    else {
      res.status(401).render("error");
    }
  }
  postUpdateProduct(req, res){
    ProductModel.update(req.body);
    let products = ProductModel.getAll();
    return res.render("products.ejs", { products });
  }
// Delete the product (controller)

  deleteProduct(req, res){
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).render("error");
    } 
    ProductModel.delete(id);
    let products = ProductModel.getAll();
    res.render('products.ejs', { products });
  }
}

