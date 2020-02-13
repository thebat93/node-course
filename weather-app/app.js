const geocode = require('./utils/geocode');

geocode("Moscow", (error, data) => {
  console.log(data);
});
