const express = require("express");
const router = new express.Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

//route to signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
