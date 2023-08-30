const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGOURI;
console.log(process.env)
const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log("MONG0DB CONNECTED");
  } catch (err) {
    console.log("Error->", err);
  }
};
module.exports = connectToMongo;
