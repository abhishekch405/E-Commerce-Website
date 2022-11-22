const Products=require('../models/products.js')

exports.getProducts=(req,res,next)=>{
    Products.findAll().then(products=>{
        res.status(201).json(products)
    }).catch(err=>console.log("Get Request Error",err));
}
exports.postProducts=(req,res,next)=>{
    //console.log(req.body);
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;

    Products.create({title:title,imgsrc:imageUrl,price:price,description:description})
        .then(result=>console.log("created a product"))
        .catch(err=>console.log(err));
}
