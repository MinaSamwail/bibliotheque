const express = require("express");
const router = new express.Router();
const axios = require("axios");





//la page d'accueil (index.hbs) recherche les livres (R)
router.get("/", (req, res) => {
  const words = ["Albert", "murder", "cat", "dog", "apple", "bootcamp", "hacking", "king", "queen", "travel", "computing", "music", "berserk", "naruto", "maite", "dbz"];
  const random = Math.floor(Math.random() * words.length);
  const searchValue = req.query.bookSearch ? req.query.bookSearch : words[random];
  const userId = req.session.userId;
  //random word to have a random index page

  console.log(userId);
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&download=epub&key=AIzaSyCQjIcG0ECWnb5Lea7W_A3o0GRIIHdTzQ4&maxResults=40`
    )
    .then(function (response) {
      const bookDetail = response.data.items;
      // console.log("Resultat de la recherche", bookDetail);
      res.render("index", { bookDetail });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const test = req.params.id;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${test}`;
  // console.log(url);
  axios
    .get(url)
    .then(function (response) {
      const bookDetail = response.data.items;
      console.log(bookDetail);
      // console.log("Resultat de la recherche", bookDetail);
      res.render("bookDetail", { bookDetail });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

module.exports = router;
