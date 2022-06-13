const express = require('express');
const sauceRouter = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const sauceControllers = require('../controllers/sauce');


sauceRouter.get('/', auth, sauceControllers.getAllSauces)
sauceRouter.get('/:id', auth, sauceControllers.getSingleSauce);
sauceRouter.post('/', auth, multer, sauceControllers.createSauce);
//sauceRouter.put('/:id', auth, sauceControllers);
//sauceRouter.delete('/:id', auth, sauceControllers);
//sauceRouter.post('/:id/like', auth,  sauceControllers);

module.exports = sauceRouter;
