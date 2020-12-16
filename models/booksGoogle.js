const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  booksID: Array,
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
