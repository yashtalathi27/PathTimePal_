const express=require('express');
const route=express.Router()
const {createjobSeeker,getUserById,signinJobSeeker,userLogin,updateUserByID, handleapply, handlesearch}=require('../controllers/freelancerController')

route.post('/',createjobSeeker);
route.get('/profile/:id', getUserById);
route.post('/profile/:id', updateUserByID);
route.post('/login', userLogin);
route.post('/apply', )
route.post('/signin', signinJobSeeker);
route.post('/apply', handleapply);
route.post('/findjobs', handlesearch);

module.exports=route;
 