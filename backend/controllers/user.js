const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');


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
        );

        user.token = token; 

        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something error with the server"})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send('All input field are required!');
        }

        const user = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, user.password);

        if (user && validPassword) {

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );
            
            user.token = token;
            res.status(200).json(user)
        }

        res.status(400).json('Invalid Credentilas')
     } catch (error) {
        
    }

}

exports.getUserProfile = async (req, res) => {
    
    const { email} = req.body;

    const user = await User.findOne({ email });
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400).send('User not found, Please sign up!')
    }
}