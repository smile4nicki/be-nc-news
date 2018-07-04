const { User } = require("../models/index");

const getAllUsers = (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { user_id } = req.params;
  User.findById(user_id)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getAllUsers, getUserById };
