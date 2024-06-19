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
    firstName: {
      type: String,
      required: [true, "A name is required!"],
      min: [5, "First name must be at least 5 characters!"],
      max: [30, "First name must be at maximum 30 characters!"],
      validate: {
        validator: function (value) {
          return validator.isAlphanumeric(value);
        },
        message: "Invalid username format!",
      },
    },
    lastName: {
      type: String,
      required: [true, "A name is required!"],
      min: [5, "Last name must be at least 5 characters!"],
      max: [30, "Last name must be at maximum 30 characters!"],
      validate: {
        validator: function (value) {
          return validator.isAlphanumeric(value);
        },
        message: "Invalid username format!",
      },
    },
    bio: {
      type: String,
      min: [1, "Bio must be at least 5 characters!"],
      max: [30, "Bio must be at maximum 30 characters!"],
      validate: {
        validator: function (value) {
          return validator.isAlphanumeric(value);
        },
        message: "Invalid bio format!",
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
    favourites: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlists" }],
    },
    genres: {
      type: [String],
    },
    followers: {
      type: [String],
    },
    follows: {
      type: [String],
    },
  },
  {
    versionKey: false,
  }
);

userCredentialsSchema.pre("save", async function (next) {
  this.updatedAt = Date.now();
  if (!this.isModified("password")) {
    return next();
  }

  this.password += pepper;
  const salt = await bcrypt.genSalt(16);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userCredentialsSchema.methods.compareHash = async function (data) {
  const hash = this.password;
  const pw = data + pepper;
  return await bcrypt.compare(pw, hash);
};

userCredentialsSchema.methods.getSafe = function () {
  this.password = undefined;
  this.updatedAt = undefined;
  this.email = undefined;
  return this;
};

userCredentialsSchema.set("toJSON", { virtuals: true });
userCredentialsSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("UserCredentials", userCredentialsSchema);
