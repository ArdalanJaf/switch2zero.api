const express = require("express");
const router = express.Router();
module.exports = router;
const carbonOffsetSim = require("./carbonOffsetSim");

router.post("/", async (req, res) => {
  try {
    let result = carbonOffsetSim(req.body);
    res.send({ status: 1, result });
  } catch (error) {
    res.send({ status: 0, error });
  }
});
