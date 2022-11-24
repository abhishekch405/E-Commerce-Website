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

exports.order=(req,res,next)=>{
    let total_amount=0;
    let fetchedOrder;
    let orderId;
    req.user.createOrder()
        .then(order=>{
            fetchedOrder=order;
            orderId=order.id;
            return req.user.getCart()
        })
        .then(cart=>{
            return cart.getProducts()
        })
        .then(products=>{
            products.forEach((item)=>{
                fetchedOrder.addProduct(item,{through:{quantity:item.cartItems.quantity}})
                total_amount+=item.cartItems.quantity*item.price;
                item.cartItems.destroy();
            })
        })
        .then(()=>{
            fetchedOrder.set({amount:total_amount});
            fetchedOrder.save();
            res.status(200).json({success:true,orderId:orderId})
        })
        .catch(err=>console.log(err));
}