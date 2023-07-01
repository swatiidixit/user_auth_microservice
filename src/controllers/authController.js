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


module.exports.signup = signup;