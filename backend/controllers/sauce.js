const ids = require('short-id')
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
      const url = req.protocol + '://' + 'localhost:3000';

      const sauce = new Sauce({
        userId: ids.generate(),
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
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
        res.status(400).json({ message: error.message})
    }
}


exports.modifySauce = async (req, res) => {
  const { userId, name, manufacturer, description, mainPepper, imageUrl, heat } = req.body;
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
      const url = req.protocol + '://' + 'localhost:3000';
      req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
          _id: req.params.id,
          userId: userId,
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          imageUrl: url + '/images/' + req.file.filename,
          heat: heat,
          likes: 0,
          dislikes: 0,
          usersLikes: [],
          usersDislikes: []
    }
      } else {
      sauce = {
           _id: req.params.id,
          userId: userId,
          name: name,
          manufacturer: manufacturer,
          description: description,
          mainPepper: mainPepper,
          imageUrl: imageUrl,
          heat: heat,
          likes: 0,
          dislikes: 0,
          usersLikes: [],
          usersDislikes: []

         }
  }


  try {
    const updatedSauce = await Sauce.updateOne({ _id: req.params.id }, sauce);
    res.status(200).json(updatedSauce)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};



exports.deleteSauce = async(req, res, next) => {
  const { id } = req.params;
  try {
    const removedSauce = await Sauce.remove({ _id: id });
    res.status(201).json(removedSauce);
  } catch (error) {
     res.status(404).json({message: error.message})
  }
}



exports.createLikes = async (req, res, next) => {

}
