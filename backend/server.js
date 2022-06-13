const bodyParser = require('body-parser')
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const url = process.env.DB_CONNECTION;
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routers/user');
const sauceRouter = require('./routers/sauce');



app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());


app.use('/api/auth', userRouter);
app.use('/api/sauces', sauceRouter)

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to the DB')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
    })

app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});
