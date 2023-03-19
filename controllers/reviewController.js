const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const multer = require("multer");
const sharp = require("sharp");
const sendEmail = require("../email");
const Post= require('./../models/postModel');
const Review=require('./../models/reviewModel');

exports.giveReview= async (req,res,next)=>
{
    try{
const reviews = await Review.create({
    post:req.body.post,
    review:req.body.review,
    rating:req.body.rating,
    to:req.body.to,
    from:req.body.from

})

res.status(200).json({status:"success",data:reviews});
    }
    catch(e)
    {
        console.log(e)
        console.log("error in giving review")
    }
}
exports.giveFeedback= async(req,res,next)=>
{
    try{
        const revId= req.body.revId;

    }catch(e){console.log("error in feedback");
console.log(e);}
}