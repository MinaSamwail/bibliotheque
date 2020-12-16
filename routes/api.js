const express = require("express");
const router = express.Router();
const AllreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");

router.post("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const userId = req.session.userId;
    console.log(userId);
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
