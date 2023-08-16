const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    is_admin: {
      type: Boolean,
      default: false,
    },
    feedback: [
      {
        title: { type: String },
        body: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
