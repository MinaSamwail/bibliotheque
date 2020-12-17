module.exports = function exposeLoginStatus(req, res, next) {
  if (!req.session.userId) {
    // il n'y pas d'user correspondant à ce client stocké en session
    res.locals.userId = undefined; // les variables suivantes sont dispos pour le template
    res.locals.isLoggedIn = false;
    res.locals.isAdmin = false;
  } else {
    // l'user correspondant à ce client est bien stocké en session
    res.locals.currentUser = req.session.userId;
    res.locals.isLoggedIn = true;
  }
  next();
};
