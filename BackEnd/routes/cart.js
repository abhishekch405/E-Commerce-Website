const express=require('express');

const router=express.Router();

const cartController=require('../controllers/cart.js');

router.get('/',cartController.getProducts);

module.exports=router;