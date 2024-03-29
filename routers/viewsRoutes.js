const express= require('express');
const Router= express.Router();
const viewsController= require('./../controllers/viewsController');
Router.route('/signUp').get(viewsController.signUp);
Router.route('/login').get(viewsController.login);
Router.route('/me').get(viewsController.aboutMe);
Router.route('/updateMe/:id').get(viewsController.updateUser);
Router.route('/home').get(viewsController.homePage);
Router.route('/home/:role').get(viewsController.base);
Router.route('/createPost/:toId').get(viewsController.creatPost);
Router.route('/viewAppointment').get(viewsController.viewAppointments);
Router.route('/updateAppointment/:pId').get(viewsController.updateAppointments);
Router.route('/chatbot').get(viewsController.chatbot);
Router.route('/viewBlocked/:toId').get(viewsController.available);
Router.route('/acceptPost/:toId').get(viewsController.acceptPost);
Router.route('/sucsAppointment').get(viewsController.sucsAppointment);
Router.route('/reviewAppointment/:pId/:toId/:fromId').get(viewsController.giveReview);
Router.route('/viewReview/:revId/').get(viewsController.viewReview);
Router.route('/viewDash').get(viewsController.viewDashBoard);
module.exports=Router;
