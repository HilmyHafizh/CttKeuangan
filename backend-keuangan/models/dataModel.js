const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  nama: String,
  jumlah: Number
});

module.exports = mongoose.model("Data", dataSchema);