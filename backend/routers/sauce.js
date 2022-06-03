const express = require('express');
const sauceRouter = express.Router();
const auth = require('../middleware/auth')


const sauceControllers = require('../controllers/sauce');


sauceRouter.get('/', sauceControllers.getAllSauces)
sauceRouter.get('/:id', sauceControllers.getSingleSauce);
//sauceRouter.post('/', sauceControllers);
//sauceRouter.put('/:id', sauceControllers);
//sauceRouter.delete('/:id', sauceControllers);
//sauceRouter.post('/:id/like', sauceControllers);

module.exports = sauceRouter;