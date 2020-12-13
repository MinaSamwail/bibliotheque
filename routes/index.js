const express = require("express");
const router = new express.Router();
const axios = require("axios");

//la page d'accueil (index.hbs)
router.get("/", (req, res) => {
  const searchValue = req.query.bookSearch ? req.query.bookSearch : "2020";
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
    .then(function (response) {
      const bookDetail = response.data.items;
      res.render("index", { bookDetail });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

//mettre a la place page user
// router.get("/search/:id", (req, res) => {});

module.exports = router;
