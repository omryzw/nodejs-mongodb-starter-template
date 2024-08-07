const mongoose = require("mongoose");
const exampleSchema = new mongoose.Schema(
  {
    exampleOmri: {
      type: String,
      required: true,
    },
    exampleMunashe: {
      type: String,
      required: true,
    },
    exampleEmmanuel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("example", exampleSchema);
