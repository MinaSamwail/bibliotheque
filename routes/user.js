//Dashboard books

const express = require("express");
const router = new express.Router();
const axios = require("axios");

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
  

//GET BY ID
// router.get("", (req, res) => {});


module.exports = router;