const express = require('express');
const sauceRouter = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer-config');


const sauceControllers = require('../controllers/sauce');

// Sauce Router
sauceRouter.get('/', auth, sauceControllers.getAllSauces)
sauceRouter.get('/:id', auth, sauceControllers.getSingleSauce);
sauceRouter.post('/', auth, upload, sauceControllers.createSauce);
sauceRouter.put('/:id', auth, upload, sauceControllers.modifySauce);
sauceRouter.delete('/:id', auth, sauceControllers.deleteSauce);
sauceRouter.post('/:id/like', auth,  sauceControllers.likesAndDislikes);

module.exports = sauceRouter;
