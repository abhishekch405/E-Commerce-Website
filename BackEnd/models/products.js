const Sequelize=require('sequelize'); //actual sequelize through npm 

const sequelize=require('../util/database.js'); //database

//let's define the schema
const Products= sequelize.define('products',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title: Sequelize.STRING,
    imgsrc:Sequelize.STRING,
    price: Sequelize.INTEGER,
    description:Sequelize.STRING
})

module.exports=Products;