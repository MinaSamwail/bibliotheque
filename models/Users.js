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
  googleID: String,
  ToReadId: { type: Schema.Types.ObjectId, ref: "ToRead" },
  AllreadyRead: { type: Schema.Types.ObjectId, ref: "AllreadyRead" },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
