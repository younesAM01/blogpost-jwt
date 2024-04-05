const userModel = require('../models/user');
const express = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

app.use(express.json());



const register = (req,res)=> {
    const data = req.body;
    userModel.create(data)
    .then((data)=>(console.log('user created succesfully',data)))
    .catch((err)=>{ console.error("Error in user creation", err)}); 
    res.send(data)
}

const login = (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email })
        .then(user => {
            if (!user) {
                // User not found
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if password matches
            if (user.password !== password) {
                // Incorrect password
                return res.status(401).json({ message: 'Incorrect password' });
            }

            // User found and password correct
            const token = jwt.sign({ name: user.name, id: user._id}, process.env.TOKEN);
            console.log(token);

            res.status(200).json({ message: 'Login successful', user });
        })
        .catch(err => {
            console.error('Error in login', err);
            res.status(500).json({ message: 'Internal server error' });
        });
  };

module.exports={register,login};