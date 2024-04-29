const mongoose = require("mongoose");
const validator = require("validator");

const playlistsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "UserCredentials",
    required: [true, "Provide an owner!"],
  },
  access: {
    type: String,
    enum: ['private', 'public', 'friends'],
    default: 'private',
    required: true,
  },
  name: {
    type: String,
    min: [3, "Minimum length is 3!"],
    max: [50, "Maximum length is 50!"],
    required: [true, "Name is required!"],
    validate: {
      validator: function (value) {
        return validator.isAlphanumeric(value);
      },
      message: "Ivalid playlist name!",
    }
  },
  description: {
    type: String,
    min: [3, "Minimum length is 3!"],
    max: [200, "Maximum length is 200!"],
  },
  tags: {
    type: [String],
  },
  songs: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

playlistsSchema.pre("save", async function (next) {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("Playlists", playlistsSchema);
