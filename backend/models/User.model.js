const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  email: { type: "String", required: true },
  cell: { type: "String", required: true },
  age: { type: "Number", required: true },
  createdAt: { type: "Date" },
  deleteAt: { type: "Date" },
});

module.exports = User = mongoose.model("user", UserSchema);
