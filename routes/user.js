//Dashboard books

const express = require("express");
const router = new express.Router();
const axios = require("axios");
const uploader = require("./../config/cloudinary");
const allreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");
const toReadReadModel = require("../models/ToRead");
const booksModel = require("./../models/books");
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

router.get("/dashboard/alreadyread", async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const dataTest = await userModel.findById(userId).populate("AllreadyRead");
    console.log(dataTest);
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

router.get("/dashboard/read", async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const dataTest = await userModel.findById(userId).populate("ToReadId");
    console.log(dataTest);
    let users = [];
    let promises = [];
    for (i = 0; i < dataTest.ToReadId.length; i++) {
      promises.push(
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
              dataTest.ToReadId[i].toReadID
          )
          .then((response) => {
            users.push(response.data.items[0]);
          })
      );
    }

    Promise.all(promises).then(() => res.render("read", { users }));
  } catch (err) {
    next(err);
  }
});

//GET BY ID and add to allready read
router.get("/dashboard/alreadyread/:id", (req, res) => {
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

router.get("/dashboard/read/:id", (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.session.userId;
    console.log(userId);
    const dataID = { UserId: userId, toReadID: id };
    allreadyReadModel
      .create(dataID)
      .then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $push: { toReadID: dbPost._id },
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

router.get("/dashboard/create", (req, res) => {
  res.render("updateBooks");
});

router.post(
  "/dashboard/create",
  uploader.single("smallThumbnail"),
  async (req, res, next) => {
    const newBook = { ...req.body };
    if (req.file) {
      console.log("REQUEST", req.file);
      newBook.smallThumbnail = req.file.path;
    } else {
      newBook.smallThumbnail = undefined;
    }
    try {
      await booksModel.create(newBook);
      res.redirect("/dashboard");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
