const path = require("path");
const express = require("express");

const app = express();
const publicDirectory = path.join(__dirname, '../public');

app.set('view engine', 'hbs')
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App' });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/help', (req, res) => {
  res.render('help');
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
