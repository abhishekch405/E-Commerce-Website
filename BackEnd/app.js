const express=require('express');
const bodyParser=require('body-parser');
const cors= require('cors');
const storeRoutes=require("./routes/store");
const adminRoutes=require('./routes/admin.js');
const sequelize = require('./util/database');
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use('/admin',adminRoutes);

app.use('/store',storeRoutes);

sequelize.sync().then(()=>app.listen(3000)).catch(err=>console.log(err));
