const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    name: String,
    description: String,
    cover: String,
    author: String,
    genres: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("book", BookSchema);
