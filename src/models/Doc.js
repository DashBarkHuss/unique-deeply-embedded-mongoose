const mongoose = require("mongoose");
const SubDoc = require("./schemas/SubDoc");

const Doc = mongoose.model(
  "Doc",
  new mongoose.Schema({
    name: String,
    subDocs: [SubDoc],
  })
);

module.exports = Doc;
