const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    user: {
      _id: { type: String, require: true },
      email: { type: String },
      phone: { type: String },
    },
    title: String,
    body: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", FeedbackSchema);
