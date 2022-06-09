const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const sauceSchema = new mongoose.Schema({
  userId: { type: ObjectId },
  name: { type: String },
  manufacturer: { type: String },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { data: Buffer, type: String },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [{ type: ObjectId }],
  usersDisliked: [{ type: ObjectId }]
});

const sauceModel = mongoose.model('sauceSchema', sauceSchema);
module.exports = sauceModel;

