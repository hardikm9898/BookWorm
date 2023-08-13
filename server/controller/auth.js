const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { statusCode, message } = require('../constant/constant');
const User = require('../model/user');
const bcrypt = require('bcrypt');

const { success, error, validation } = require('../response-api/responseApi');

const register = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body.data;
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(statusCode.CONFLICT)
        .json(error(message.REGISTERED, res.statusCode));
    }

    user = new User({ userName, email, password, phone });

    await user.save();
    res
      .status(statusCode.SUCCESS)
      .json(success('Success', message.REGISTER, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(statusCode.VALIDATION_ERROR)
        .json(error(message.VALIDATION_ERROR, res.statusCode));

    // const valid = await bcrypt.compare(password, user.password);
    const valid = password === user.password;

    if (!valid)
      return res
        .status(statusCode.VALIDATION_ERROR)
        .json(error(message.VALIDATION_ERROR, res.statusCode));

    const jwtToken = await jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });
    res.cookie('token', jwtToken);
    res
      .status(statusCode.SUCCESS)
      .json(success('success', { token: jwtToken }, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

module.exports = {
  login,
  register,
};
