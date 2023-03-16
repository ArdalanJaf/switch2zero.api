const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static("public"));

const port = process.env.PORT || 6010;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
