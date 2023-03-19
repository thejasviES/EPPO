const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const reviewSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: [true, "you should be an user to post"],
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "you should be an user to post"],
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "you should be an user to post"],
  },
  review: String,
  rating: Number,
  feedback: {
    type: String,
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "post",
    
  });
  this.populate({
    path: "from",
    select: "name email phone photo ",
  });
  this.populate({
    path: "to",
    select: "name email phone photo ",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
