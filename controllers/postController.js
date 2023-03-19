const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const multer = require("multer");
const sharp = require("sharp");
const sendEmail = require("../email");
const Post= require('./../models/postModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  try {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb((req, res) => {
        res
          .status(400)
          .json({ status: "success", message: "upload only photos" });
      }, false);
    }
  } catch (e) {
    console.log("error at dealers file filtrt");
    console.log(e);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.resizePhoto = async (req, res, next) => {
  try {
    req.body.postPhoto = [];
    await Promise.all(
      req.files.map(async (file, i) => {
        const filename = `post-${Date.now()}-${i + 1}.jpeg`;
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/postPhotos/${filename}`);
        req.body.postPhoto.push(filename);
      })
    );
    next();
  } catch (e) {
    console.log("eror at resize dealers crop pic");
    console.log(e);
  }
};
exports.createPost = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const idUser = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET,
      (err, decoded) => {
        return decoded.id;
      }
    );
    day = req.body.date;
    timeStamp = req.body.time;
    console.log(day,timeStamp)
    const createPost = await Post.create({
    
      postPhoto: req.body.postPhoto,
      from: idUser,
      to: req.body.to,
      toTime:req.body.toTime,
      postDescription: req.body.postDescription,
      date:req.body.date,
      time:req.body.time
    });

    const reciver = await User.findById(req.body.to);
    const sender= await User.findById(idUser);
    
    try {
      await sendEmail({
        email: sender.email,
        subject: `hi  ${sender.name} your post is submitted successfully`,
        message: ` from 404-WEB-HACKERS you have posted a request ,  ${sender.name} to the dealer ${reciver.name}\n please wait for some time until you get responded by the professional`,
      });
    } catch (err) {
      console.log("error while sending email");
      console.log(err);
    }

    try {
      await sendEmail({
        email: reciver.email,
        subject: `hi  ${reciver.name} you have new post notification`,
        message: `welcome mail from 404-WEB-HACKERS you have recived an appointment request ,  ${reciver.name} from the user ${sender.name}\n please reply  `,
      });



    } catch (err) {
      console.log("error while sending email");
    }
    res.status(200).json({
      status: "success",
      data: createPost,
    });
  } catch (e) 
  {
    console.log("error at creating analyst post");
    console.log(e);
  }
};
exports.updateAppointment=async (req,res,next)=>
{
    try{
        
    const pid= req.body.pId;
    console.log(pid);
    const data=await Post.findByIdAndUpdate(pid,{profDesc:req.body.profDesc},{ new: true, runValidators: true });
    res.status(201).json({status:"success",data:data})
    try {
        await sendEmail({
          email: data.from.email,
          subject: `hi Client ${data.from.name} you have new post notification`,
          message: `welcome mail from 404-WEB-HACKERS your post is been updated with description,  from ${data.to.name} , Thankyou `,
        });
      } catch (err) {
        console.log("error while sending email");
      }

      try {
        await sendEmail({
          email: data.to.email,
          subject: `hi ${data.to.name} ${data.from.name} you have new post notification`,
          message: `welcome mail from 404-WEB-HACKERS your post is been updated with description,  to ${data.to.name} , Thankyou `,
        });
      } catch (err) {
        console.log("error while sending email");
      }
    
    
    }
    catch(e){
        console.log(e);
    }
}

exports.acceptAppointment=async (req,res,next)=>
{
    try{

        pid= req.body.pId;
        // comsole.log(pid);
        const data=await Post.findByIdAndUpdate(pid,{Accept:1},{ new: true, runValidators: true });
res.status(200).json({status:"success",data:data})
    }catch(e)
    {
        console.log(e)
        console.log("error in accepting");
    }
}