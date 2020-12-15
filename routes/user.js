//Dashboard books

const express = require("express");
const router = new express.Router();
const axios = require("axios");
const allreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");

//GET dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.get("/", (req, res) => {
  // const searchValue = req.query.bookSearch ? req.query.bookSearch : "naruto";
  axios
    .get(
      `https://www.googleapis.com/books/v1/users/104370469578924429909/bookshelves/2/volumes?key=AIzaSyC-ajZu5UYDsyY2kjnN6UQ0YOI1Yd5Ds0k`
    )
    .then(function (response) {
      const bookDetail = response.data.items;
      // console.log("Resultat de la recherche", bookDetail);
      res.render("dashboard", { bookDetail });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
router.get("/dashboard/read", async (req, res, next) => {
  try {
    const dataTest = await userModel
      .findById("5fd8c80be22c3a5cdccc0e4c")
      .populate("AllreadyRead");
    console.log(dataTest);

    res.render("allreadyRead", { dataTest });
  } catch (err) {
    next(err);
  }
});
//GET BY ID and add to allready read
router.get("/dashboard/read/:id", (req, res) => {
  const id = req.params.id;
  const userId = "5fd8c80be22c3a5cdccc0e4c";
  const dataID = { UserId: userId, AllreadyRead: id };
  allreadyReadModel.create(dataID).then((dbPost) => {
    return userModel
      .findByIdAndUpdate(userId, {
        $push: { AllreadyRead: dbPost._id },
      })
      .then(() => res.redirect("/"))
      .catch((err) =>
        console.log(`Err while creating the post in the DB: ${err}`)
      );
  });
});

router.get("/dashboard/to-read/:id", (req, res) => {
  res.redirect("to-read");
});

// function unrollToRead(){
//   axios
//     .get(
//         allreadyReadModel.find()
//     )
//     .then((
//       response
//     ) => {const data = response.data}, console.log(response))
// }
// unrollToRead();

module.exports = router;
