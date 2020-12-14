const express = require("express");
const router = new express.Router();
const axios = require("axios");

//la page d'accueil (index.hbs) recherche les livres (R)
router.get("/", (req, res) => {
  const searchValue = req.query.bookSearch ? req.query.bookSearch : "naruto";
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
  //console.log(url);
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

//route to signin
router.get("/signin", (req, res) => {
  res.render("signin");
});

//route to signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

// router.get("/search/:id", (req, res) => {});

module.exports = router;
