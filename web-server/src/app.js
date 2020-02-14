const path = require("path");
const express = require("express");

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectory);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
