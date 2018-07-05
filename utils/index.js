const formatTopicData = topicData => {
  return topicData.map(topics => {
    return { ...topics };
  });
};

const formatUserData = userData => {
  return userData.map(users => {
    return { ...users };
  });
};

const createTopicRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.slug] = docs[i]._id;
    return ref;
  }, {});
};

const createUserRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.username] = docs[i]._id;
    return ref;
  }, {});
};

const formatArticleData = (articleData, topicRef, userRef) => {
  return articleData.map(article => {
    const newArticle = Object.assign({}, article);
    newArticle.created_by = userRef[article.created_by];
    newArticle.belongs_to = topicRef[article.topic];
    return newArticle;
  });
};

const createArticleRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.title] = docs[i]._id;
    return ref;
  }, {});
};

const formatCommentData = (commentData, articleRef, userRef) => {
  return commentData.map(comment => {
    const newComment = Object.assign({}, comment);
    newComment.created_by = userRef[comment.created_by];
    newComment.belongs_to = articleRef[comment.belongs_to];
    return newComment;
  });
};

module.exports = {
  formatTopicData,
  formatUserData,
  createTopicRef,
  createUserRef,
  formatArticleData,
  formatCommentData,
  createArticleRef
};
