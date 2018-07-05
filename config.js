process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    DB_URL: "mongodb://localhost:27017/northcoders_news"
  },

  test: {
    DB_URL: "mongodb://localhost:27017/northcoders_news_test"
  }
};

module.exports = config[process.env.NODE_ENV];
