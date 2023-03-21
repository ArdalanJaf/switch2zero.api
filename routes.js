const express = require("express");
const router = express.Router();
module.exports = router;
const carbonOffsetSim = require("./carbonOffsetSim");
const connection = require("./mySQL/connection");
const queries = require("./mySQL/queries");

router.post("/", async (req, res) => {
  try {
    let config = await connection(queries.getConfig());

    let result = carbonOffsetSim(req.body, config);
    res.send({ status: 1, result });
  } catch (error) {
    res.send({ status: 0, error });
  }
});

// config

router.get("/config", async (_, res) => {
  try {
    let result = await connection(queries.getConfig());
    res.send({ status: 1, result });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.get("/max_trees_annaul_purchase", async (_, res) => {
  try {
    let result = await connection(queries.getConfig("max_annual_purchase"));
    res.send({ status: 1, max_annual_purchase: result[0].max_annual_purchase });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.post("/update_config", async (req, res) => {
  try {
    //check change included, check values are correct?
    if (Object.keys(req.body).length > 0) {
      let result = await connection(queries.updateConfig(req.body));
      res.send({ status: 1, config: result });
    } else {
      res.send({ status: 1, error: "No config keys + values sent." });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.post("/default_config", async (_, res) => {
  try {
    await connection(queries.resetConfig());
    res.send({ status: 1 });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});
