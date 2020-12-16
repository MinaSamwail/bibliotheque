//Dashboard books

const express = require("express");
const router = new express.Router();
const axios = require("axios");
const allreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");
const { map } = require("../app");

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
  const userId = req.session.userId;
  try {
    const dataTest = await userModel.findById(userId).populate("AllreadyRead");

    let users = [];
    let promises = [];
    for (i = 0; i < dataTest.AllreadyRead.length; i++) {
      promises.push(
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
              dataTest.AllreadyRead[i].AllreadyRead
          )
          .then((response) => {
            users.push(response.data.items[0]);
          })
      );
    }

    Promise.all(promises).then(() => res.render("allreadyRead", { users }));
  } catch (err) {
    next(err);
  }
});
//GET BY ID and add to allready read
router.get("/dashboard/read/:id", (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.session.userId;
    console.log(userId);
    const dataID = { UserId: userId, AllreadyRead: id };
    allreadyReadModel
      .create(dataID)
      .then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $push: { AllreadyRead: dbPost._id },
        });
      })
      .then(() => res.redirect("/"));
  } catch (error) {
    next(error);
  }
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
