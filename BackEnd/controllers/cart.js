const Cart=require('../models/cart.js')

exports.getProducts=(req,res,next)=>{
    Cart.findAll().then(products=>{
        console.log(products);
        res.status(201).json(products)
    }).catch(err=>console.log("Get Request Error",err));
}