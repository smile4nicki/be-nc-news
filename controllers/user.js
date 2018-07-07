const { User } = require("../models/index");

const getAllUsers = (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username: `${username}` })
    .then(user => {
      if (!user) {
        return next({
          status: 404,
          message: `Page not found for ${username}`
        });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
module.exports = { getAllUsers, getUserByUsername };
