const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AllreadyReadSchema = new Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "Users" },
  AllreadyRead: Array,
});

const AllreadyReadModel = mongoose.model("AllreadyRead", AllreadyReadSchema);
module.exports = AllreadyReadModel;
