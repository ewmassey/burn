var config = {};

config.mongo_host = "localhost";
config.mongo_db = "burner";
config.mongo_uri = "mongodb://" + config.mongo_host + "/" + config.mongo_db;

config.root_url = "http://localhost:5000";

module.exports = config;