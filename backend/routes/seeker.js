const express=require('express');
const route=express.Router()
const {createjobSeeker,getUserById,signinJobSeeker,userLogin,updateUserByID}=require('../controllers/freelancerController')

route.post('/',createjobSeeker);
route.get('/profile/:id', getUserById);
route.post('/profile/:id', updateUserByID);
route.post('/login', userLogin);
route.post('/signin', signinJobSeeker);


module.exports=route;
 