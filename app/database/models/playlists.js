const mongoose = require("mongoose");
const validator = require("validator");

const playlistsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      validate: {
        validator: function (value) {
          return validator.isAlphanumeric(value);
        },
        message: "Ivalid playlist name!",
      },
      required: [true, "Provide an owner!"],
    },
    access: {
      type: String,
      enum: ["private", "public", "followers"],
      default: "private",
      required: true,
    },
    name: {
      type: String,
      min: [3, "Minimum length is 3!"],
      max: [30, "Maximum length is 50!"],
      required: [true, "Name is required!"],
    },
    description: {
      type: String,
      min: [3, "Minimum length is 3!"],
      max: [200, "Maximum length is 100!"],
    },
    src: {
      type: String,
      default: undefined,
    },
    tags: {
      type: [String],
      default: [],
    },
    songs: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

playlistsSchema.pre("save", async function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Playlists", playlistsSchema);
