const express=require('express');
const User=require('./../models/userModel');
const jwt=require('jsonwebtoken');
const Post=require('./../models/postModel');
const Review=require('./../models/reviewModel');
const path = require('path');
exports.signUp= async (req,res,next)=>{
    res.status(200).render('signUp')
}
exports.login= async (req,res,next)=>{
    res.status(200).render('login')
}
exports.aboutMe= async (req,res,next)=>
{
  try{ const idUser = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => { return decoded.id });
  const user= await User.findById(idUser);
  res.status(200).render('aboutMe',{user});}catch(e){console.log(e)}
}
exports.updateUser=async (req,res,next)=>
{  
   try{ const user= await User.findById(req.params.id)
    res.status(200).render('updateMe' ,{user})}catch(e){console.log(e)}
}
exports.homePage=async(req,res,next)=>
{
    res.status(200).render('home');
}
exports.base=async(req,res,next)=>
{
    const parm= req.params.role
    const user= await User.find();
    res.status(200).render('base',{parm,user})
}
exports.creatPost=async (req,res,next)=>
{
    const parm=req.params.toId;
    console.log(parm)
    res.status(200).render('createPost',{parm})
}
exports.viewAppointments=async(req,res,next)=>
{
    const posts= await Post.find();
    const idUser = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => { return decoded.id });
  const user= await User.findById(idUser);
    res.status(200).render('viewAppointment',{posts, idUser})
}
exports.updateAppointments=async(req,res,next)=>
{
    const pid=req.params.pId;
    
    res.status(200).render('updateAppointment',{pid})
}
exports.chatbot=async(req,res,next)=>
{
    res.status(200).render('chatbot');
}
exports.available=async(req,res,next)=>
{
    const posts= await Post.find();
    const toId= req.params.toId;
    res.status(200).render('availablity',{toId,posts})
}

exports.acceptPost=async (req,res,next)=>
{
    try{
        const parm= req.params.toId;
        console.log(parm)
        res.status(200).render('accept',{parm})
    }catch(e)
    {
        console.log(e)
    }
}
exports.sucsAppointment=async (req,res,next)=>
{
const posts= await Post.find();
const parm=jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => { return decoded.id });
res.status(200).render('sucsAppointment',{posts, parm})
}
exports.giveReview=async(req,res,next)=>
{
    parm=req.params.pId;
    fromId=req.params.fromId;
    toId=req.params.toId;
    res.status(200).render('giveReview',{parm,fromId,toId});

}
exports.viewReview=async (req,res,next)=>{
    const parm=req.params.revId;
    const posts = await Review.find();


    console.log(posts);
    res.status(200).render('viewReview',{parm,posts})
}
exports.viewDashBoard=async(req,res,next)=>
{
    try{
read.status(200).render('userDashboard')
    }catch(e){
        console.log(e);
        console.log("err in viewDash")
    }
}