const { userService, authService} = require('../services');
const {userModel} = require("../models")


async function signup (req, res) {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const existingUseremail = await userModel.findOne( {where : {email : email}});
    
    if(existingUseremail){
        return res.status(400).json({message: "email already exists"});
    }

    const existingUsername = await userModel.findOne({where :{username : username}});
    if(existingUsername){
        return res.status(400).json({message: "Username already exists"});
    }

    const result = await userService.createUser(firstName, lastName, email, username, password);

    const payload = {email : result.email, id : result.id}
    const token = await authService.createToken(payload);
   

    return res.status(201).json({ message: 'User created successfully' , token: token});
  } catch (error) {
    console.log("error",error)
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


async function signin (req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne( { where : {email : email}});
    if(!existingUser){
        return res.status(400).json({message: "User not found"});
    }
   
    const isValidPassword = await userService.matchPassword(password, existingUser.password);
   if(!isValidPassword){
      return res.status(400).json({message: "Invalid Creds"});
   }
    
   const payload = {email : existingUser.email, id : existingUser.id}
    const token = await authService.createToken(payload);
    return res.status(201).json({ message: 'Logged in successfully' , user: existingUser, token: token});
  } catch (error) {
    console.error('Error during signin:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports.signup = signup;
module.exports.signin = signin;