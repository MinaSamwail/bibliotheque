const express = require("express");
const router = new express.Router();
const User = require("./../models/Users");
const bcrypt = require("bcrypt");
// const middleware = require("../middlewares/exposeFlashMessages");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  console.log("ICI", req.body);
  const foundUser = await User.findOne({ email: email }); // findById ??

  if (!foundUser) {
    // console.log("email invalid");
    req.flash("error", "invalid email");
    res.redirect("/auth/signin");
    console.log("email invalid");
  } else {
    console.log("Bon MAIL");
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      console.log("NOT THE PASS");
      req.flash("error", "Invalid password");
      res.redirect("/auth/signin");
    } else {
      console.log("bon Pass");
      // const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password;
      console.log(req.session, "before defining current user");
      req.session.userId = userObject._id;
      req.session.currentUser = userObject;
      req.flash("success");
      res.redirect("/");
    }
  }
});

//route to signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });
    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/auth/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
      req.flash(
        "success",
        "Congrats ! You are now registered ! Please connect to your account"
      );
      res.redirect("/auth/signin");
    }
  } catch (error) {
    next(error);
  }
});

//Logout

router.post("/logout", (req, res) => {
  req.session.destroy();
  // req.session.userId = null;
  // console.log(req.session.userId);
  res.redirect("/");
});

module.exports = router;
