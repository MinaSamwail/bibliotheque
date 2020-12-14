require("dotenv").config();
require("./../config/mongo");
const UserModel = require("../models/Users");

const users = [
  {
    username: "Jean-Claude",
    email: "jcvd@mail.com",
    password: "1234",
    avatar: "",
  },
];

async function inserUser() {
  try {
    await UserModel.deleteMany(); // empty the styles db collection
    const inserted = await UserModel.insertMany(users); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}
inserUser();
