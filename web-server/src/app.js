const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("Hello");
});

app.get("/help", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
