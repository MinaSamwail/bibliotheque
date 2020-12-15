require("dotenv").config();
require("./../config/mongo");
const AllreadyReadModel = require("../models/AllreadyRead");

const booksAllReadyRead = [
  {
    AllreadyRead: ["G0MuAgAAQBAJ"],
    userID: "",
  },
];

async function AllReadyRead() {
  try {
    await AllreadyReadModel.deleteMany(); // empty the styles db collection
    const inserted = await AllreadyReadModel.insertMany(booksAllReadyRead); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}
AllReadyRead();
