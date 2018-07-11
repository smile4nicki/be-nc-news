# Northcoders New API

An API which keeps the user updated on all the news at Northcoders. It uses Node.js and Mongo for the database.

It can be accessed at https://nichola-northcoders-news.herokuapp.com/

## Getting Started

To get started fork the repo by clicking the fork button in the top right hand corner of this github page. When asked "Where should we fork this repository?" choose your github account. Then you will want to clone the repo. Click the green clone or download button and then copy the link:

```
https://github.com/<username>/BE-FT-northcoders-news.git
```

You will then need to change into the correct directory. You can do this by:

```
cd northcoders-news
```

### Prerequisites

You will need to have node.js installed. To check that node is installed type following into the command line:

```
node -v
```

This should print the version number of node you have so something like:

```
v0.10.35
```

If you do not have node.js installed please install it by visiting https://nodejs.org/en/ and following the instructions.

### Installing

You will then need to ensure that other dependencies are installed which are used for testing these include:

```
chai mocha supertest nodemon mongoose express
```

This can be done by typing the following into the command line:

```
npm i
```

All the necessary dependencies with be installed at once.

##Setting up the config file

You will need to set up a config.js file to ensure that that you can can access the database and run tests. This should be set up in the root folder and can be created by typying the following into the command line:

```
touch config.js
```

It should be set up as follows:

```
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    DB_URL: "mongodb://localhost:27017/northcoders_news"
  },

  test: {
    DB_URL: "mongodb://localhost:27017/northcoders_news_test"
  },
  production: {
    DB_URL:
      "mongodb://testUser123:1northcodersnews@ds131601.mlab.com:31601/northcodersnews"
  }
};

module.exports = config[process.env.NODE_ENV];
```

## Running the tests

To run the tests you must first ensure that mongo db is running. You can do this by typing the following command into the command line:

```
mongod
```

To run the tests for this API you use the command

```
npm t
```

Tests have been completed to make sure that the routes work:

```
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
```

And tests have also been completed to ensure that errors are handled correclty:

```
 it(`POST responds with 400 for missing required article field`, () => {
      return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
        .send({
          something: "anotherTest"
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(`Bad request : body is required!`);
        });
    });
  });
```

## Deployment

You are required to seed the database. To do this type the following command into the command line:

```
npm run seed:dev
```

You will receive a message in the console to say that the database has been seeded:

```
the database has been seeded!
```

## Built With

- [MongoDB](http://www.mongodb.com/) - The database used
- [MLAB](https://mlab.com/) - The website used for hosting the database
- [Heroku](https://dashboard.heroku.com/) - The website used for hosting the application
- [Node](https://nodejs.org/en/)

## Authors

- **Nichola Ward** - [smile4nicki](https://github.com/smile4nicki)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
