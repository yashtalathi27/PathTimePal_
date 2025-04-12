const express=require('express');
const route=express.Router();

const {userLogin, getJobs}=require('../controllers/recController')

route.post('/login',userLogin);
route.get('/jobs/:id', getJobs);


module.exports=route;
 