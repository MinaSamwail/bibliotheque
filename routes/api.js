const express = require("express");
const router = express.Router();
const AllreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");
const toReadReadModel = require("../models/ToRead");
const axios = require("axios");

router.post("/alreadyread/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const userId = req.session.userId;
    const dataID = { UserId: userId, AllreadyRead: id };
    res.status(201).json(
      AllreadyReadModel.create(dataID).then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $push: { AllreadyRead: dbPost._id },
        });
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get("/dashboard/alreadyread", async (req, res, next) => {
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
    let test = dataTest.AllreadyRead;

    Promise.all(promises).then(function () {
      res.status(201).json([users, test]);
    });
  } catch (err) {
    next(err);
  }
});

router.post("/read/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const userId = req.session.userId;
    const dataID = { UserId: userId, toReadID: id };
    res.status(201).json(
      toReadReadModel.create(dataID).then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $push: { ToReadId: dbPost._id },
        });
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post("/dashboard/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.session.userId;
    console.log(userId);
    res.status(201).json(
      await AllreadyReadModel.findByIdAndRemove(id)

        .then((dbPost) => {
          return userModel.findByIdAndUpdate(userId, {
            $pull: { AllreadyRead: dbPost._id },
          });
        })
        .then(() => res.redirect("/user/dashboard/alreadyread"))
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
