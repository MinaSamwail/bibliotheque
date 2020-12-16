const express = require("express");
const router = express.Router();
const AllreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");
const toReadReadModel = require("../models/ToRead");

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

module.exports = router;
