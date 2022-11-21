const express = require('express');
const router=express.Router();

const adminController=require("../controllers/admin.js");


router.post('/add-product',adminController.postProducts);

router.get('/',adminController.getProducts);

module.exports=router;