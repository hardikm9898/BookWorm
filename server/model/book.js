const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const booSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  imageUrl: {
    data: Buffer,
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', booSchema);
