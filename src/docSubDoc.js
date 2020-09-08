const mongoose = require("mongoose");
const db = require("./models");

//this file is a server file that creates a NOT-unique subdocument

const createDoc = async (doc) => {
  const newDoc = await db.Doc.create(doc);
  return newDoc;
};

const createSubDoc = (doc) => {
  return db.Doc.findOneAndUpdate(
    { name: "dash" },
    {
      $push: {
        subDocs: {
          name: "sub document",
        },
      },
    },
    { new: true }
  );
};

async function run() {
  let doc = await createDoc({ name: "dash" });
  let newDoc = await createSubDoc(doc);

  console.log(`\n updated Doc: ${newDoc}`);
}
mongoose
  .connect("mongodb://localhost/bezkoder_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((err) => console.error("Connection error", err));

run();
