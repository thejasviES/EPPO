const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const postSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "you should be an user to post"],
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "You should post to a perticular proffessional "],
  },
  postPhoto: [String],
  postDescription: String,
  Accept: {
    type: Number,
    min: 0,
    max: 1,
    default: 0,
  },

  date:String,
  time:String,
  toTime:String,
  block:{type:Number,
  default :0,
max:1},
profDesc:{type:String,
default:"no description"},
payment:{type:String,
default:"not done"}
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "from",
    select: "name photo phone email",
  });
  next();
});
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "to",
    select: "name photo phone email",
  });
  next();
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
