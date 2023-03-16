const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/", async (req, res) => {
  try {
    res.send({ status: 1 });
  } catch (error) {
    res.send({ status: 0, error });
  }
});
