const MongoClient = require("mongodb").MongoClient;

let mongoDB;

const setupDB = (callback) => {
  const uri =
    "mongodb+srv://userramarao:passwordramarao@eventsdb-fl4dg.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      mongoDB = client.db("full-stack-server");

      if (err) {
        console.log(err);
        return callback(err);
      } else {
        return callback("DB Connected");
      }
    }
  );
};

const getDB = () => {
  return mongoDB;
};

module.exports = { setupDB, getDB };
