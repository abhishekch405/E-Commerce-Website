const express=require('express');

const router=express.Router();

const cartController=require('../controllers/cart.js');

router.get('/',cartController.getCartProducts);

router.post('/',cartController.postCartProducts);

router.post('/delete-cart-item',cartController.deleteCartProduct);

module.exports=router;