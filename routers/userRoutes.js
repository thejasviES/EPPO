const express= require('express');
const Router= express.Router();
const authController= require('./../controllers/authController');
const postController= require('./../controllers/postController');
const reviewController=require('./../controllers/reviewController');
 Router.route('/signUp').post(authController.signUp);
 Router.route('/login').post(authController.login);
 Router.route('/logout').post(authController.logout);
 Router.route('/updateMe').patch(authController.protect,authController.upload.single("photo"),authController.resizeUserImage,authController.updateMe)
 Router.route('/createPost').post(authController.protect,postController.upload.array("postPhoto",5),postController.resizePhoto,postController.createPost)
 Router.route('/updatePost').patch(authController.protect,postController.updateAppointment);
 Router.route('/acceptPost').patch(authController.protect,postController.acceptAppointment);
 Router.route('/giveReview').post(authController.protect,reviewController.giveReview);
 module.exports=Router;