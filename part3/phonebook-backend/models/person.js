const mongoose = require("mongoose");

require("dotenv").config();

const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_URI = `mongodb+srv://johnadithya008_db_user:${MONGODB_PASS}@fullstackopen.bxrwquz.mongodb.net/?appName=fullstackopen`;

mongoose.connect(MONGODB_URI, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

module.exports = mongoose.model("Person", personSchema);