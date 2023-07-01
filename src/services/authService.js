const { SECRET_KEY } = require("../config/config");
const jwt = require("jsonwebtoken");

exports.createToken = async(data) => {
      const secretKey = SECRET_KEY;
      const token = jwt.sign(data, secretKey);
      return token;
}


  