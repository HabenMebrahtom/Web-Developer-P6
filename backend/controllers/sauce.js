import { nanoid } from 'nanoid'
const Sauce = require('../models/sauce');


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

exports.createSauce = async (req, res, next) => {

      const { name, manufacturer, description, mainPepper, heat } = req.body;
      const file = req.file.filename;
      const url = req.protocol + '://' + req.get('host');


  console.log(nanoid())
      const sauce = new Sauce({
        //userId: nanoid(6),
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        imageUrl: url + '/images/' + file,
        heat: heat,
        likes: 0,
        dislikes: 0,
        usersLikes: [],
        usersDislikes: []
      });

    try {
       const savedSauce = await sauce.save()
       res.status(200).json(savedSauce)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
