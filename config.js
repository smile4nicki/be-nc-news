process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    DB_URL: "mongodb://localhost:27017/northcoders_news"
  }

  // test: {
  //   host: "localhost",
  //   port: 5432,
  //   database: "game_of_sql_test"
  // },
  // PORT: 9091
};

module.exports = config[process.env.NODE_ENV];
