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
  it("GET responds with status 400 for an invalid mongo topic ID", () => {
    return request
      .get("/api/topics/dumdumdum")
      .expect(400)
      .then(res => {
        expect(res.text).to.equal(
          `Bad request : "dumdumdum" is an invalid ID!`
        );
      });
  });
  describe("/topics/:topic_id/articles", () => {
    it("GET responds with status 200 and articles based on the topic id", () => {
      return request
        .get(`/api/topics/${topicDocs[0]._id}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].belongs_to.slug).to.equal(
            `${topicDocs[0].slug}`
          );
          expect(res.body.articles[0]).to.include.keys(
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by",
            "comments"
          );
          expect(res.body.articles[0].title).to.be.a("string");
        });
    });
    it("GET responds with status 400 for an invalid topic mongo ID when getting articles by topic id", () => {
      return request
        .get("/api/topics/dumdumdum/articles")
        .expect(400)
        .then(res => {
          expect(res.text).to.equal(
            `Bad request : "dumdumdum" is an invalid ID!`
          );
        });
    });
    it("POST responds with status 201 and a new article added to the topic id", () => {
      return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
        .send({
          title: "test",
          body: "hello",
          created_by: `${userDocs[0]._id}`
        })
        .expect(201)
        .then(res => {
          expect(res.body.article.title).to.be.a("string");
          expect(res.body.article).to.be.an("object");
        });
    });
    it(`POST responds with 400 for missing required article field`, () => {
      return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
        .send({
          something: "anotherTest"
        })
        .expect(400)
        .then(res => {
          expect(res.text).to.equal(`Bad request : required field is missing!`);
        });
    });
  });
  describe("/articles", () => {
    it("GET responds with 200 and an array of articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(articleDocs.length);
          expect(res.body.articles[0]).to.include.keys(
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by",
            "comments"
          );
          expect(res.body.articles[0].votes).to.be.a("number");
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
          expect(res.body.article).to.include.keys(
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by"
          );
        });
    });
  });
  it("GET responds with status 404 for an article id that does not exist", () => {
    return request
      .get(`/api/articles/${topicDocs[0]._id}`)
      .expect(404)
      .then(res => {
        expect(res.body.message).to.equal(
          `Page not found for ${topicDocs[0]._id}`
        );
      });
  });
  it("PUT returns a comment vote decreased by one", () => {
    return request
      .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
      .expect(200)
      .then(res => {
        expect(res.body.article.votes).to.equal(articleDocs[0].votes - 1);
      });
  });

  it("PUT returns a comment vote increased by one", () => {
    return request
      .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
      .expect(200)
      .then(res => {
        expect(res.body.article.votes).to.equal(articleDocs[0].votes + 1);
      });
  });
  it("PUT responds with status 400 for an invalid article id when using a vote", () => {
    return request
      .put(`/api/articles/$shoes?vote=down`)
      .expect(400)
      .then(res => {
        expect(res.text).to.equal(`Bad request : "$shoes" is an invalid ID!`);
      });
  });
  describe("/articles/:article_id/comments", () => {
    it("GET responds with a status of 200 and an array of comments realated to an article id", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comment[0].belongs_to).to.be.a("string");
          expect(res.body.comment[0]).to.include.keys(
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by"
          );
        });
    });
    it("GET responds with status 400 for an invalid article id when getting comments", () => {
      return request
        .get(`/api/articles/dumdumdum/comments`)
        .expect(400)
        .then(res => {
          expect(res.text).to.equal(
            `Bad request : "dumdumdum" is an invalid ID!`
          );
        });
    });
    it("POST responds with status 201 and a new comment added to the article", () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send({
          title: "test",
          body: "hello",
          belongs_to: `${articleDocs[0]._id}`,
          created_by: `${userDocs[0]._id}`
        })
        .expect(201)
        .then(res => {
          expect(res.body.comment.body).to.be.a("string");
        });
    });
    it(`POST responds with 400 for missing required field`, () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send({
          something: "anotherTest"
        })
        .expect(400)
        .then(res => {
          expect(res.text).to.equal("Bad request : required field is missing!");
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
  it("GET responds with status 400 for an invalid mongo comment ID", () => {
    return request
      .get("/api/comments/dumdumdum")
      .expect(400)
      .then(res => {
        expect(res.text).to.equal(
          `Bad request : "dumdumdum" is an invalid ID!`
        );
      });
  });
  it("PUT returns a comment vote decreased by one", () => {
    return request
      .put(`/api/comments/${commentDocs[0]._id}?vote=down`)
      .expect(200)
      .then(res => {
        expect(res.body.comment.votes).to.equal(commentDocs[0].votes - 1);
      });
  });
  it("PUT returns a comment vote increased by one", () => {
    return request
      .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
      .expect(200)
      .then(res => {
        expect(res.body.comment.votes).to.equal(commentDocs[0].votes + 1);
      });
  });
  it("PUT responds with status 400 for an invalid comment id when using vote", () => {
    return request
      .put(`/api/comments/shoes?vote=up`)
      .expect(400)
      .then(res => {
        expect(res.text).to.equal(`Bad request : "shoes" is an invalid ID!`);
      });
  });
  it(`DELETE responds with 200 and a console log saying 'Comment Delted!`, () => {
    return request
      .delete(`/api/comments/${commentDocs[0]._id}`)
      .expect(200)
      .then(res => {
        expect(res.body.message).to.equal("Comment Deleted!");
        return request
          .get(`/api/comments/${commentDocs[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.comment).to.equal(null);
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
          expect(res.body.user.username).to.equal(`${userDocs[0].username}`);
          expect(res.body.user.name).to.be.a("string");
        });
    });
  });
  it("GET responds with status 404 for a username that does not exist", () => {
    return request
      .get("/api/users/dumdumdum")
      .expect(404)
      .then(res => {
        expect(res.body.message).to.equal(`Page not found for dumdumdum`);
      });
  });
});
