require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// geocode("Moscow", (error, data) => {
//   console.log(data);
// });

forecast(-75.7088, 44.1545, (error, data) => {
  console.log(data);
});