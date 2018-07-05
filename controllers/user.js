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
  User.find({ username: `${username}` })
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

// const getReposByUsername = (req, res, next) => {};

module.exports = { getAllUsers, getUserByUsername };
