const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: {type: String, require: true },
    dates: { type: Array, require: true },
    place: { type: String, require: true },
    scheduler: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Event", eventSchema);