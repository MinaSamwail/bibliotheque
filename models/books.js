const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  smallThumbnail: {
    type: String,
    // default: "Lien de Cloudinary"
  },
  language: String,
  pages: Number,
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
