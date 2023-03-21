const connection = require("./mySQL/connection");
const queries = require("./mySQL/queries");

module.exports = {
  validateToken: async (req, res, next) => {
    console.log("validation request");
    if (!req.headers.token) {
      console.log("no token");
      res.send({ status: 0, error: "No token sent." });
      return;
    }

    const results = await connection(queries.checkUserToken(req.headers.token));
    if (results.length) {
      console.log("token valid");
      req.headers.userId = results[0].userId;
      next();
    } else {
      console.log("token invalid");
      res.send({ status: 0, error: "Sorry, wrong token." });
    }
  },
};
