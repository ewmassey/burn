var config = {};

config.mongo_host = "localhost";
config.mongo_db = "burner";
config.mongo_uri = process.env.MONGOHQ_URL || "mongodb://" + config.mongo_host + "/" + config.mongo_db;

config.root_url = process.env.ROOT_URL || "http://localhost:5000";

module.exports = config;