const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  smallThumbnail: {
    type: String,
    default:
      "https://www.echosciences-grenoble.fr/uploads/article/image/attachment/1005414294/xl_livre.png",
  },
  language: String,
  pages: Number,
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
