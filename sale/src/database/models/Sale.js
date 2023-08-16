const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SaleSchema = new Schema(
  {
    date: Date,
    records: [
      {
        book: {
          _id: { type: String, require: true },
          name: { type: String },
          description: { type: String },
          cover: { type: String },
          author: { type: String },
          genres: { type: Array },
        },
        qty: { type: Number, require: true },
        unit_price: String,
        total_price: String,
      },
    ],
    created_by: {
      _id: { type: String, require: true },
      email: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sale", SaleSchema);
