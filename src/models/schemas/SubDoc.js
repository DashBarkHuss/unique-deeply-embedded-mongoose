const mongoose = require("mongoose");
const SubSubDoc = require("./SubSubDoc");

const SubDoc = new mongoose.Schema({
  name: String,
  subSubDocs: [SubSubDoc],
});

module.exports = SubDoc;
