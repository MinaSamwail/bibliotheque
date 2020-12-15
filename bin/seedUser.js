require("dotenv").config();
require("./../config/mongo");
const UserModel = require("../models/Users");

const users = [
  {
    username: "Jean-Claude",
    email: "jcvd@mail.com",
    password: "1234",
    avatar: "",
    googleID: "104370469578924429909",
    ToReadId: ["5fd8b9dfc901fa548f83e8ae"],
    AllreadyRead: ["5fd8bd368e42be57e2574f1b"],
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
