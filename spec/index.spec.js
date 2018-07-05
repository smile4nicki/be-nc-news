process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed");
const testData = require("../seed/testData");
const mongoose = require("mongoose");

describe("northcoders_news", () => {
  let commentDocs;
  let topicDocs;
  let userDocs;
  let articleDocs;

  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [commentDocs, topicDocs, userDocs, articleDocs] = docs;
      // console.log(docs[0]);
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/topics", () => {
    it("GET responds with 200 and an array of topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          // console.log(res.body.topic);
          expect(res.body.topic.length).to.equal(topicDocs.length);
          expect(res.body.topic[0]).to.include.keys("title", "slug");
          expect(res.body.topic[0].title).to.be.a("string");
        });
    });
  });
  describe("/topics/:topic_id", () => {
    it("GET responds with status 200 and topic with the correct id", () => {
      return request
        .get(`/api/topics/${topicDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.topic._id).to.equal(`${topicDocs[0]._id}`);
        });
    });
  });
  describe("/topics/:topic/articles", () => {
    it("GET responds with status 200 and articles based on the topic input", () => {
      return request
        .get(`/api/topics/${topicDocs[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.article[0].belongs_to.slug).to.equal(
            `${topicDocs[0].slug}`
          );
          expect(res.body.article[0]).to.include.keys(
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by"
          );
          expect(res.body.article[0].title).to.be.a("string");
        });
    });
  });

  describe("/comments", () => {
    it("GET responds with 200 and an array of comments", () => {
      return request
        .get("/api/comments")
        .expect(200)
        .then(res => {
          expect(res.body.comment.length).to.equal(commentDocs.length);
          expect(res.body.comment[0]).to.include.keys(
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by"
          );
          expect(res.body.comment[0].votes).to.be.a("number");
        });
    });
  });
  describe("/comments/:comment_id", () => {
    it("GET responds with a status 200 and a comment with the correct id", () => {
      return request
        .get(`/api/comments/${commentDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.comment._id).to.equal(`${commentDocs[0]._id}`);
        });
    });
  });
  describe("/articles", () => {
    it("GET responds with 200 and an array of articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.article.length).to.equal(articleDocs.length);
          expect(res.body.article[0]).to.include.keys(
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by"
          );
          expect(res.body.article[0].votes).to.be.a("number");
        });
    });
  });
  describe("/articles/:article_id", () => {
    it("GET responds with a status 200 and an article with the correct id", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article._id).to.equal(`${articleDocs[0]._id}`);
        });
    });
  });
  describe("/users", () => {
    it("GET responds with 200 and an array of users", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body.user.length).to.equal(userDocs.length);
          expect(res.body.user[0]).to.include.keys(
            "username",
            "name",
            "avatar_url"
          );
          expect(res.body.user[0].name).to.be.a("string");
        });
    });
  });
  describe("/users/:username", () => {
    it("GET responds with a status 200 and user with the correct username", () => {
      return request
        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user[0].username).to.equal(`${userDocs[0].username}`);
        });
    });
  });
});
