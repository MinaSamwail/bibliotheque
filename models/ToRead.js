const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toReadSchema = new Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "Users" },
  toReadID: String,
});

const ToReadModelModel = mongoose.model("ToRead", toReadSchema);
module.exports = ToReadModelModel;
