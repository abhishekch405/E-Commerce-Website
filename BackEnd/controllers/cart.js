const Cart=require('../models/cart.js');
const Products = require('../models/products.js');

exports.getCartProducts=(req,res,next)=>{
    req.user.getCart()
    .then(cart=>{
      return cart.getProducts()
        .then(products=>{
          res.status(201).json(products)
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err));
}

exports.postCartProducts=(req,res,next)=>{
    let fetchedCart;
    let productId=req.body.productId;
    let newQuantity=1;
    req.user.getCart()
        .then(cart=>{
            fetchedCart=cart;
            return cart.getProducts({where:{id:productId}})    
        })
        .then(products=>{
            let product;
            if(products.length>0){
                product=products[0];
            }
            if(product){
                let oldQuantity=product.cartItems.quantity;
                newQuantity=oldQuantity+1;
                return product;
            }
            return Products.findByPk(productId);
        })
        .then(product=>{
            fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
            return product;
        })
        .then((product)=>{
            res.status(201).json(product);
        })
        .catch(err=>console.log(err));
}

exports.deleteCartProduct=(req,res,next)=>{
    let productId=req.body.productId;
    console.log(productId);
    req.user.getCart()
        .then(cart=>{
            return cart.getProducts({where:{id:productId}})
        })
        .then(products=>{
            product=products[0];
            product.cartItems.destroy();
        })
        .then(result=>{
            console.log("Product removed from the Cart");
            res.status(201);
        })
        .catch(err=>console.log(err));
}