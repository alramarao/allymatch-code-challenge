const MongoClient = require("mongodb").MongoClient;

let mongoDB;

/**
 * @constant setupDB to connect with mongodb
 * @param {function} callback function to access the object
 */
const setupDB = (callback) => {
  const uri =
    "mongodb+srv://userramarao:passwordramarao@eventsdb-fl4dg.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      /**
       * @database full-stack-server */
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
