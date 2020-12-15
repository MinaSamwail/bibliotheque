require("dotenv").config();
require("./../config/mongo");
const BookModel = require("../models/books");

const users = [
  {
    title: "JS pour les nuls",
    author: "Frank Marmier",
    description: "a book to learn js",
    smallThumbnail: "",
    language: "FR",
    pages: 450,
    booksID: ["wj0uAgAAQBAJ","G0MuAgAAQBAJ"],
  },
];

async function inserBook() {
  try {
    await BookModel.deleteMany(); // empty the styles db collection
    const inserted = await BookModel.insertMany(users); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}
inserBook();
