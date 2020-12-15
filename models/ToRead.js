const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toReadSchema = new Schema({
    userID: String,
    toReadID: Array,
}),

const ToRead = mongoose.model("ToRead", toReadSchema);
module.exports = ToRead;