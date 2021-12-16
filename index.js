const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();

const Router = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(cors());
app.use(express.json());
// app.use(Router);
app.use("/api/auth", Router);
app.use(express.static("public"));

app.listen(4000, console.log(`Server is ready on port ${PORT}`));
