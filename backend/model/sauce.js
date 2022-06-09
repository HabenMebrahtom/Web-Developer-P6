const mongoose = require('mongoose');
const nanoid = require('nanoid')

const sauceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: () => nanoid(7),
    index: {unique: true}
    },
  name: { type: String },
  manufacturer: { type: String },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { data: Buffer, type: String },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }]
});

const sauceModel = mongoose.model('sauceSchema', sauceSchema);
module.exports = sauceModel;

