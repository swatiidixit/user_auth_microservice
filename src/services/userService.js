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


