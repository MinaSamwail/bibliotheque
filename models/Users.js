const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  avatar: {
    type: String,
    // default: "Lien de Cloudinary"
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
