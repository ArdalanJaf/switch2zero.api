const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static("public"));

app.use("/", router);

const port = process.env.PORT || 6010;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
