const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "you must give email adress"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, " valid mail id is required"],
  },
  phone: {
    type: String,
    required: [true, "you must give phone number"],
    unique: true,
    lowerCase: true,
  },
  photo: {
    type: String,
    default: "default.jpeg",
  },
  roles: {
    type: String,
    default: "user",
    enum: ["doctor", "principal", "barber", "lawyer", "theraphist","user"],
  },

  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
  },
  password: {
    type: String,
    required: [true, "user must give password"],
    minlength: [8, "password should have 8 charecters"],
  },
  confirmPassword: {
    type: String,
    // required: [true, "you must confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },

  sum: {
    type: Number,
    default: 0,
  },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  preference: { type: [String], default: "null" },
  location:{type:String,default:"Bengalore"}
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
