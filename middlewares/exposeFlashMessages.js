module.exports = function exposeFlashMessage(req, res, next) {
    res.success_msg = req.flash("success");
    res.warning_msg = req.flash("warning");
    res.error_msg = req.flash("error");
    next(); // passe la main au prochain middleware (si défini), sinon passe la main au callback d'une route
  };
  