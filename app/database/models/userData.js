const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  who: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserCredentials",
  },
  genres: {
    type: [String],
  },
});

module.exports = mongoose.model("UserData", userDataSchema);
