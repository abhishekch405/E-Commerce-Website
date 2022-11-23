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
    
    //Products.create({title:title,imgsrc:imageUrl,price:price,description:description})

    req.user.createProduct({title:title,imgsrc:imageUrl,price:price,description:description})
        .then(result=>{
            console.log("created a product");
            res.status(201).json(req.body);
        })
        .catch(err=>console.log(err));
}

exports.deleteProduct=(req,res,next)=>{
    const productId=req.body.productId;

    Products.findByPk(productId)
        .then(product=>{
            return product.destroy();
        })
        .then(result=>{
            console.log('Product deleted from the database');
            res.status(201).json(req.body);
        })
        .catch(err=>console.log(err));


}