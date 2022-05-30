const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config')

const url = process.env.DB_CONNECTION;
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routers/user')


app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());


app.use('/api', userRouter)

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })




app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});