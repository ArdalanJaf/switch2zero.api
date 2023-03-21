const express = require("express");
const router = express.Router();
module.exports = router;
const carbonOffsetSim = require("./carbonOffsetSim");
const connection = require("./mySQL/connection");
const queries = require("./mySQL/queries");
const getUniqueToken = require("./util/getUniqueToken");
const middleware = require("./middleware");
const sha256 = require("sha256");

router.post("/", async (req, res) => {
  try {
    let configResult = await connection(queries.getConfig());

    let result = carbonOffsetSim(
      req.body,
      JSON.parse(JSON.stringify(configResult[0]))
    );

    res.send({ status: 1, result });
  } catch (error) {
    res.send({ status: 0, error });
  }
});

// config

router.get("/config", middleware.validateToken, async (_, res) => {
  try {
    let result = await connection(queries.getConfig());
    res.send({ status: 1, config: result[0] });
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

router.post("/update_config", middleware.validateToken, async (req, res) => {
  try {
    //check change included, check values are correct?
    if (Object.keys(req.body).length > 0) {
      await connection(queries.updateConfig(req.body));
      res.send({ status: 1 });
    } else {
      res.send({ status: 1, errors: ["No new config properties sent."] });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.post("/default_config", middleware.validateToken, async (_, res) => {
  try {
    await connection(queries.resetConfig());
    res.send({ status: 1 });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    // hash password
    const hashedPassword = sha256(
      req.body.password + "HASHCODE" // normally would be in env
    );
    req.body.password = hashedPassword;

    // check username + password are correct
    let result = await connection(
      queries.checkUserAndPassword(req.body.username, req.body.password)
    );
    // if username/password valid create + set token, send token to front
    if (result[0].count > 0) {
      const { userId } = result[0];
      const token = getUniqueToken(128);
      await connection(queries.deleteTokenById(userId));
      await connection(queries.setToken(userId, token));
      res.send({ status: 1, loginReturn: { userId, token: token } });
    } else {
      res.send({ status: 1, error: "Invalid username / password" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.post("/save", async (req, res) => {
  try {
    let result = await connection(queries.getConfig());
    req.body.configData = result[0];
    await connection(queries.save(req.body));

    res.send({ status: 1 });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.get("/get_saves_list", async (req, res) => {
  try {
    let result = await connection(queries.getSavesList());
    // result.map((s)=> {s.dateSaved = })
    res.send({ status: 1, saveList: result });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.post("/load", async (req, res) => {
  try {
    let saveData = await connection(queries.getSave(req.body.id));

    const { formData, resultData, configData } = saveData[0];

    // let result = carbonOffsetSim(
    //   formData, configData
    // );

    res.send({
      status: 1,
      loaded: { form: formData, data: resultData, config: configData },
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});

router.post("/delete", async (req, res) => {
  try {
    await connection(queries.delSave(req.body.id));

    res.send({
      status: 1,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, error });
  }
});
