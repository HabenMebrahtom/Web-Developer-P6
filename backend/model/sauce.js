const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
    sauce: {type: String},
    image: {type: File}
});


const sauceModel = mongoose.model('sauceSchema', sauceSchema);
module.exports = sauceModel;