const mongoose = require("mongoose");
const db = require("./models");

const createDoc = async (doc) => {
  const newDoc = await db.Doc.create(doc);
  return newDoc;
};

const createUniqueSubDoc = (docId, name) => {
  return db.Doc.findOneAndUpdate(
    { _id: docId, "subDocs.name": { $ne: name } },
    {
      $push: {
        subDocs: {
          name: name,
        },
      },
    },
    { new: true, useFindAndModify: false }
  );
};

const createUniqueSubSubDoc = async function (docId, subDocId, subSubDoc) {
  const doc = await db.Doc.findById(docId);
  const subDoc = doc.subDocs.id(subDocId);

  if (subDoc.subSubDocs.find((ssd) => ssd.name == subSubDoc.name))
    return `oops! you already named a SubSubDoc '${subSubDoc.name}'`;
  subDoc.subSubDocs.push(subSubDoc);
  await doc.save();
  return doc.subDocs.id(subDocId);
};

async function run() {
  let doc = await createDoc({ name: "Doc name" });
  console.log(`\n>> doc created---->> \n\n ${doc}`);
  let newDoc = await createUniqueSubDoc(doc._id, "SubDoc name");
  subDoc = newDoc.subDocs[newDoc.subDocs.length - 1];
  doc = await db.Doc.findById(doc._id);
  console.log(`\n>> added a subDoc---->> \n\n ${doc}`);
  let subSubDoc = await createUniqueSubSubDoc(doc._id, subDoc._id, {
    name: "subSubDoc name",
  });
  doc = await db.Doc.findById(doc._id);
  console.log(`\n>> added a subSubDoc---->> \n\n ${doc}`);
  subSubDoc = await createUniqueSubSubDoc(doc._id, subDoc._id, {
    name: "subSubDoc name",
  });
  console.log(`\n>> trying to add a second subSubDoc---->> ${subSubDoc}`);
  doc = await createUniqueSubSubDoc(
    doc._id, // the id for a Doc
    subDoc._id, // the id for a SubDoc of that Doc
    { name: "subSubDoc name" } // the object for the new SubSubDoc
  );
}
mongoose
  .connect("mongodb://localhost/embeddedDocs_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((err) => console.error("Connection error", err));

run();
