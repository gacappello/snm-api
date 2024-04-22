const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jwt");

const env = require("../../environment");
const pepper = env.PEPPER;

const userCredentialsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email must be unique!"],
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email format!",
    },
  },
  username: {
    type: String,
    required: [true, "username is required!"],
    unique: [true, "Username must be unique!"],
    min: [5, "Username must be at least 5 characters!"],
    max: [30, "username must be at maximum 30 characters!"],
    validate: {
      validator: function (value) {
        return validator.isAlphanumeric(value);
      },
      message: "Invalid username format!",
    },
  },
  password: {
    type: String,
    required: [true, "A password is required!"],
  },
  salt: {
    type: String,
    required: [true, "Salt is required!"],
  },
  birthDate: {
    type: Date,
    required: [true, "Provide a valid birth date!"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

userCredentialsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(16);
  const hash = await bcrypt.hash(this.password, salt);
  this.salt = salt;
  this.password = hash + pepper;
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserCredentials", userCredentialsSchema);
