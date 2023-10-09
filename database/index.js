const { MongoClient } = require("mongodb");

const connectToDb = async () => {
  try {
    const client = await new MongoClient(process.env.MONGO_URL).connect();
    const db = client.db(process.env.MONGOUSER);
    console.log(`Connected`);
    return db;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
