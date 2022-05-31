const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/*exports.getAllUsers = async (req, res) => {
    console.log(User)
} */


exports.registerUser = async (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send('All input field is required!');
        }

        const olderUser = await User.findOne({ email });

        if (olderUser) {
            return res.status(409).send('The user is already registered. please, log in!');
        }
     

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email: email.toLowerCase(),
            password: hashedPassword
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token
        

        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something error with the server"})
    }

   /* const body = req.body;

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    // creating a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    try {
          user.save().then((doc) => res.status(201).send(doc));
    } catch (error) {
         console.log(JSON.stringify(error));
        if(error.code === 11000){
            return res.send({status:'error',error:'email already exists'})
        }
        throw error
    }    */
}

exports.loginUser = async(req, res) => {
    const body = req.body;

    const user = await User.findOne({ email: body.email });
    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            res.status(200).json({ message: 'Valid password' });
        } else {
            res.status(400).json({ message: 'Invalid password' });
        } 
    } else {
        res.status(401).json({ message: 'The user never found' });
    }
}