const express = require("express");
const router = express.Router();
const AllreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");

router.post("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = "5fd8c80be22c3a5cdccc0e4c";
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

module.exports = router;
