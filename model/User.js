const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      min: 5,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024
    }
  })

  module.exports = mongoose.model("User", userSchema);;