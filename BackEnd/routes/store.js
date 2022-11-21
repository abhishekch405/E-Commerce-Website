const express = require('express');
const router=express.Router();

const storeController=require("../controllers/store.js");


router.post('/',storeController.postProducts);

module.exports=router;