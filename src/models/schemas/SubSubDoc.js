const mongoose = require("mongoose");

const SubSubDoc = new mongoose.Schema({
  name: String,
});

module.exports = SubSubDoc;
