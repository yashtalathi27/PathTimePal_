const express=require('express');
const route=express.Router()
const {createjobSeeker,getUserById,updateUserByID}=require('../controllers/freelancerController')

route.post('/',createjobSeeker);
route.get('/profile/:id', getUserById);
route.post('/profile/:id', updateUserByID);

module.exports=route;
