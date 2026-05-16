const express = require("express");
const router = express.Router();

const {
  getData,
  addData,
  deleteData,
  updateData
} = require("../controllers/dataController");

router.get("/data", getData);
router.post("/data", addData);
router.delete("/data/:id", deleteData);
router.put("/data/:id", updateData);
module.exports = router;
