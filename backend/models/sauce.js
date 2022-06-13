const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const sauceSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String,  required: true },
  manufacturer: { type: String,  required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { data: Buffer, type: String },
  heat: { type: Number },  // number between 1 and 10
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }]
});

const sauceModel = mongoose.model('sauceSchema', sauceSchema);
module.exports = sauceModel;

