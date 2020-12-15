require("dotenv").config();
require("./../config/mongo");
const ToReadModelModel = require("../models/ToRead");

const booksToRead = [
  {
    toReadID: ["wj0uAgAAQBAJ"],
    userID: "",
  },
];

async function ToReadModel() {
  try {
    await ToReadModelModel.deleteMany(); // empty the styles db collection
    const inserted = await ToReadModelModel.insertMany(booksToRead); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}
ToReadModel();
