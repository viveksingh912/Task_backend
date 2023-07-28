const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
connectToMongo();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/tasks", require("./Routes/tasks"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
