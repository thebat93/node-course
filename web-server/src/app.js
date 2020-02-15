const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

// Setup static directory to serve
app.use(express.static(publicDirectory));

const CREATOR = "Igor Alekseev";

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", creator: CREATOR });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", creator: CREATOR });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", creator: CREATOR });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article was not found",
    creator: CREATOR
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  res.send({
    address: req.query.address
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    creator: CREATOR
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
