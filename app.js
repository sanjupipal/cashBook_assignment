const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { Sequelize } = require("sequelize");
global.app = {};
require("./db");
//allowed cors
app.use(cors());

//body parser
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.json({ message: "It's working..." });
});
app.use("/api/v1", require("./routes/index"));

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
