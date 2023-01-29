const { connect, set } = require("mongoose");
set("strictQuery", true);
async function dbConfig() {
  try {
    await connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log("db configured");
  } catch (e) {
    console.log("error in connecting db", e);
    process.exit();
  }
}

module.exports = { dbConfig };
