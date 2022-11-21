const Sequelize=require('sequelize'); //actual sequelize through npm 

const sequelize=require('../util/database.js'); //database

//let's define the schema
const Cart= sequelize.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name: Sequelize.STRING,
    imgsrc:Sequelize.STRING,
    price: Sequelize.INTEGER
})

module.exports=Cart;