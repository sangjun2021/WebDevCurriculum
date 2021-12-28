const jwt = require("jsonwebtoken");

require("dotenv").config();

class JwtController {
  createToken(username) {
    return jwt.sign({ username }, process.env.JWT_KEY, {
      expiresIn: "600m",
    });
  }
  validateToken(token) {
    return jwt.verify(token, process.env.JWT_KEY);
  }
}
const jwtController = new JwtController();

module.exports = jwtController;
