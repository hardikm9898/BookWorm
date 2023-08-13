const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  whitelist:[
    {
     id:{type:mongoose.Schema.ObjectId}
    }
  ]
});
module.exports = mongoose.model('Users', userSchema);
