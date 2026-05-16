const Data = require("../models/dataModel");

// 🔹 GET (ambil semua data)
exports.getData = async (req, res) => {
  try {
    console.log("GET /data masuk");

    const data = await Data.find().maxTimeMS(5000);

    res.json(data);
  } catch (err) {
    console.log("ERROR GET DATA:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 POST (tambah data)
exports.addData = async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.json({ message: "Data ditambah", data: newData });
  } catch (err) {
    console.log("ERROR ADD DATA:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DELETE (hapus data)
exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;

    await Data.findByIdAndDelete(id);

    res.json({ message: "Data dihapus" });
  } catch (err) {
    console.log("ERROR DELETE:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 UPDATE (edit data)
exports.updateData = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Data.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Data berhasil diupdate",
      data: updated
    });
  } catch (err) {
    console.log("ERROR UPDATE:", err);
    res.status(500).json({ error: err.message });
  }
};
