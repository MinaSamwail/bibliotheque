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
  // googleID: String,
  bookallreadyReadId: [
    { type: Schema.Types.ObjectId, ref: "Book", default: [] },
  ],
  ToReadId: [{ type: Schema.Types.ObjectId, ref: "ToRead", default: [] }],
  AllreadyRead: [
    { type: Schema.Types.ObjectId, ref: "AllreadyRead", default: [] },
  ],
  author: [{ type: Schema.Types.ObjectId, ref: "Book", default: [] }],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
