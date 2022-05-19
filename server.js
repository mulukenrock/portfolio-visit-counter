require("dotenv").config();

const express = require("express");
const body_parser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const port = process.env.EXPRESS_PORT;

var corsOptions = {
  origin: process.env.CORS_ALLOWED_SITE,
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(body_parser.json({ limit: "100mb" }));
app.use(body_parser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(helmet());

app.post("/count", require("./express/count"));
app.get("/visits", require("./express/visits"));

app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});
