const Sauce = require('../model/sauce');


// get all sauces
exports.getAllSauces = async(req, res) => {
    try {
        const sauce = await Sauce.find();
        res.json(sauce)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get a single sauce
exports.getSingleSauce= async(req, res) => {
    try {
        const sauce = await Sauce.findById(req.params.id);
        res.json(sauce);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Upload the file

exports.singleFileUpload = async (req, res, next) => {
    try {
        const file = req.file;
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}