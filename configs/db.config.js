require("dotenv").config();
const mongoose = require("mongoose");

exports.dbConnect = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DATABASE_URL || "");

  global.db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => {
    console.log(
      "Successfully Connected to the Database ✨✨ : ",
      process.env.DATABASE_URL,
    );
  });
};

exports.dbClose = async () => {
  try {
    await db.close();
  } catch (e) {
    console.error(e);
  }
};

//* We can use mongo for everything else except the vector search.
