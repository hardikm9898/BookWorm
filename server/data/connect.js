require('dotenv').config();
const mongoose = require('mongoose');

const connect = mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => {
    // console.log(err);
    console.log(err.message);
  });

module.exports = connect;
