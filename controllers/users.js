const Student = require('../models/user');

module.exports = {
  index
};

function index(req, res, next) {
  console.log(req.query)
  res.render('index', {
    user: req.user
  });
};