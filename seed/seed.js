const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const {
  formatTopicData,
  formatUserData,
  createTopicRef,
  createUserRef,
  formatArticleData,
  formatCommentData,
  createArticleRef
} = require("../utils");

const seedDB = ({ topicData, userData, articleData, commentData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      // topicData = formatTopicData(topicData);
      //userData = formatUserData(userData);
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      const topicRef = createTopicRef(topicData, topicDocs);
      const userRef = createUserRef(userData, userDocs);
      articleData = formatArticleData(articleData, topicRef, userRef);
      return Promise.all([Article.insertMany(articleData), userRef]);
    })
    .then(([articleDocs, userRef]) => {
      const articleRef = createArticleRef(articleData, articleDocs);
      commentData = formatCommentData(commentData, articleRef, userRef);
      return Comment.insertMany(commentData);
    })
    .then(() => {
      console.log("The database has been seeded!");
    })
    .catch(console.log);
};

module.exports = seedDB;
