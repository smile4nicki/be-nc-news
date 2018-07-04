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
  articleData.map(article => {
    article.created_by = userRef[article.created_by];
    article.belongs_to = topicRef[article.topic];
    console.log(article);
  });
  return articleData;
};

const createArticleRef = (collection, docs) => {
  return collection.reduce((ref, item, i) => {
    ref[item.title] = docs[i]._id;
    return ref;
  }, {});
};

const formatCommentData = (commentData, articleRef, userRef) => {
  commentData.map(comment => {
    comment.created_by = userRef[comment.created_by];
    comment.belongs_to = articleRef[comment.belongs_to];
  });
  return commentData;
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
