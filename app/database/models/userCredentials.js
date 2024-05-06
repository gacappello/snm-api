const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const env = require("../../environment");
const pepper = env.PEPPER;

const userCredentialsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email already exists!"],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email format!",
      },
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: [true, "Username already taken!"],
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
    genres: {
      type: [String],
    },
    followers:  {
      type: [String]
    },
    follows: {
      type: [String]
    }
  },
  {
    versionKey: false,
  }
);

userCredentialsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password += pepper;
  const salt = await bcrypt.genSalt(16);
  this.password = await bcrypt.hash(this.password, salt);
  this.updatedAt = Date.now();
  next();
});

userCredentialsSchema.methods.compareHash = async function (data) {
  const hash = this.password;
  const pw = data + pepper;
  return await bcrypt.compare(pw, hash);
};

userCredentialsSchema.methods.getSafe = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.updatedAt;
  delete obj.email;
  console.log(obj)
  return obj;
};

module.exports = mongoose.model("UserCredentials", userCredentialsSchema);
