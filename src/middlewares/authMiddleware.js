const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers.Authorization;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token_split = token.split(" ");
    
    token = token_split[0] !== "bearer" ? token_split[0] : token_split[1];

    jwt.verify(token, SECRET_KEY, (error, user) => {
      if (error) {
        console.log("error in verifying token", error);
        return res.status(401).json({ message: "token unauthorized" });
      }
      req.userId = user.id;
      next();
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports.verifyToken = verifyToken;
