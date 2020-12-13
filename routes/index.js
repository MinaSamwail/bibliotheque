const express = require("express");
const router = express.Router();

//la page d'accueil (index.hbs)
router.get("/", (req, res) => {
  res.render("index");
});

//mettre a la place page user
router.get("", (req, res) => {
  res.render("myproduct");
});

module.exports = router;
