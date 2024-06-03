require("dotenv").config();
const express = require("express");
const app = express();
require("./db/db_connexion");
const cors = require("cors");
const router = require("./routes/router");

const port = 4500;

app.use(cors());
app.use(express.json());
app.use(router);
app.use("/api", router);

app.listen(port,()=>{
    console.log(`Server is running in http://localhost:${port}`)
})