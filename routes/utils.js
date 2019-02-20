const verifyUser = (req, res, next) => {
  if (req.session.id) {
    next();
  } else {
    res.status(403).send('Not authorized');
  }
};

module.exports = verifyUser;

