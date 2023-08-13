const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
require('./data/connect');

const { PORT } = process.env;

const app = express();
const isAuth = require('./middleware/isAuth');
const authRoutes = require('./routes/auth');
var cors = require('cors');
const adminRoutes = require('./routes/user');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded());
app.use(express.json());

app.use(cors());
app.use('/auth', authRoutes);
app.use('/user', isAuth, adminRoutes);

app.listen(PORT, () => {
  console.log(`server is  running on ${PORT}`);
});
