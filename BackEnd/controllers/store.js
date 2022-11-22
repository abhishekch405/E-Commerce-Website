const Products=require('../models/products.js')

exports.getProducts=(req,res,next)=>{
    Products.findAll().then(products=>{
        res.status(201).json(products)
    }).catch(err=>console.log("Get Request Error",err));
}
