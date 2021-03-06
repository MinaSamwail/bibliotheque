//Dashboard books

const express = require("express");
const router = new express.Router();
const axios = require("axios");
const uploader = require("./../config/cloudinary");
const allreadyReadModel = require("../models/AllreadyRead");
const userModel = require("../models/Users");
const toReadReadModel = require("../models/ToRead");
const booksModel = require("../models/books");
const { map } = require("../app");
const protectedRoute = require("./../middlewares/protectRoute");

// router.use(protectedRoute);

//GET dashboard
router.get("/dashboard", protectedRoute, (req, res) => {
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

router.get("/dashboard/alreadyread", async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const dataTest = await userModel.findById(userId).populate("AllreadyRead");
    const databooksAlreadyRead = await userModel
      .findById(userId)
      .populate("bookallreadyReadId");

    const data2 = databooksAlreadyRead.bookallreadyReadId;

    let users = [];
    let promises = [];

    for (i = 0; i < dataTest.AllreadyRead.length; i++) {
      promises.push(
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes/" +
              dataTest.AllreadyRead[i].AllreadyRead
          )
          .then((response) => {
            console.log(response);
            users.push(response.data);
          })
      );
    }
    let test = dataTest.AllreadyRead;

    Promise.all(promises).then(function () {
      const map = new Map();
      users.forEach((item) => map.set(item.id, item));
      test.forEach((item) =>
        map.set(item.AllreadyRead, { ...map.get(item.AllreadyRead), ...item })
      );
      const mergedArr = Array.from(map.values());

      res.render("allreadyRead", { mergedArr, data2 });
    });
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard/read", async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const dataTest = await userModel.findById(userId).populate("ToReadId");
    console.log("dataTest ====>", dataTest);
    let users = [];
    let promises = [];
    for (i = 0; i < dataTest.ToReadId.length; i++) {
      promises.push(
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes/" +
              dataTest.ToReadId[i].toReadID
          )
          .then((response) => {
            console.log(response.data);
            users.push(response.data);
          })
      );
    }
    let test = dataTest.ToReadId;
    Promise.all(promises)
      .then(function () {
        const map = new Map();
        users.forEach((item) => map.set(item.id, item));
        test.forEach((item) =>
          map.set(item.toReadID, { ...map.get(item.toReadID), ...item })
        );
        const mergedArr2 = Array.from(map.values());
        res.render("read", { mergedArr2 });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    next(err);
  }
});
//GET BY ID and add to allready read
router.get("/dashboard/alreadyread/:id([a-z0-9A-Z-_]{12})", (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.session.userId;

    const dataID = { UserId: userId, AllreadyRead: id };
    allreadyReadModel
      .create(dataID)
      .then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $push: { AllreadyRead: dbPost._id },
        });
      })
      .then(() => res.redirect("/"));
  } catch (error) {
    next(error);
  }
});

router.get("/dashboard/read/:id([a-z0-9A-Z-_]{12})", (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.session.userId;

    const dataID = { UserId: userId, toReadID: id };
    toReadReadModel
      .create(dataID)
      .then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $push: { toReadID: dbPost._id },
        });
      })
      .then(() => res.redirect("/"));
  } catch (error) {
    next(error);
  }
});

router.get(
  "/dashboard/booksCreated",

  async (req, res, next) => {
    const userId = req.session.userId;
    try {
      const data = await userModel.findById(userId).populate("author");

      res.render("booksCreated", { data });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/dashboard/to-read/:id", (req, res) => {
  res.redirect("to-read");
});

router.get("/dashboard/create", async (req, res) => {
  const userId = req.session.userId;

  try {
    res.render("createBooks", { user: await userModel.findById(userId) });
  } catch (error) {
    next(error);
  }
});

router.get("/dashboard/update/:id", async (req, res, next) => {
  try {
    const book = await booksModel.findById(req.params.id);
    res.render("updateBooks", book);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/dashboard/create",
  uploader.single("smallThumbnail"),
  async (req, res, next) => {
    const userId = req.session.userId;
    const newBook = { ...req.body };
    if (req.file) {
      console.log("REQUEST", req.file);
      newBook.smallThumbnail = req.file.path;
    } else {
      newBook.smallThumbnail = undefined;
    }
    try {
      await booksModel.create(newBook).then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $push: { author: dbPost._id },
        });
      });
      res.redirect("/user/dashboard");
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/dashboard/update/:id",
  uploader.single("smallThumbnail"),
  async (req, res, next) => {
    const booktoUpdate = { ...req.body };
    if (req.file && req.file.path) {
      booktoUpdate.smallThumbnail = req.file.path;
    }
    try {
      await booksModel.findByIdAndUpdate(req.params.id, booktoUpdate, {
        new: true,
      });
      res.redirect("/user/dashboard");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/dashboard/alreadyRead/community/delete/:id",
  async (req, res, next) => {
    const userId = req.session.userId;
    const deleteId = req.params.id;
    try {
      await userModel
        .findByIdAndUpdate(userId, {
          $pull: { bookallreadyReadId: deleteId },
        })

        .then(() => res.redirect("/user/dashboard/alreadyread"));
    } catch (error) {
      next(error);
    }
  }
);

router.get("/dashboard/alreadyRead/delete/:id", async (req, res, next) => {
  const userId = req.session.userId;
  try {
    await allreadyReadModel
      .findByIdAndRemove(req.params.id)

      .then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $pull: { AllreadyRead: dbPost._id },
        });
      })
      .then(() => res.redirect("/user/dashboard/alreadyread"));
  } catch (error) {
    next(error);
  }
});

router.get("/dashboard/read/delete/:id", async (req, res, next) => {
  const userId = req.session.userId;
  try {
    await toReadReadModel
      .findByIdAndRemove(req.params.id)
      .then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $pull: { toReadID: dbPost._id },
        });
      })
      .then(() => res.redirect("/user/dashboard/read"));
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard/booksCreated/delete/:id", async (req, res, next) => {
  const userId = req.session.userId;
  try {
    await booksModel
      .findByIdAndDelete(req.params.id)
      .then((dbPost) => {
        return userModel.findByIdAndUpdate(userId, {
          $pull: { author: dbPost._id },
        });
      })
      .then(() => res.redirect("/user/dashboard/booksCreated"));
  } catch (error) {
    next(error);
  }
});

router.get("/books", async (req, res, next) => {
  const books = await booksModel.find();

  res.render("books", { books });
});

router.get("/dashboard/books/alreadyread/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.session.userId;

    await userModel
      .findByIdAndUpdate(userId, {
        $push: { bookallreadyReadId: id },
      })

      .then(() => res.redirect("/user/books"));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
