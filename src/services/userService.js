const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (firstName, lastName, email, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
  };

  return User.create(user);
};

exports.matchPassword = async (currentPassword, hashedPassword) => { 
  try {
  const isMatch = await bcrypt.compare(currentPassword, hashedPassword)
  return isMatch;
  } catch(error){
    console.error('Error comparing passwords:', error);
  }
}


