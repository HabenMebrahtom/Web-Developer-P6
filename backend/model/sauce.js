const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
    sauce: {type: String},
    imageUrl: {data: Buffer, type: String}
});

const sauceModel = mongoose.model('sauceSchema', sauceSchema);
module.exports = sauceModel;