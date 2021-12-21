const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class Auth {
  #hash;
  #disgest;
  constructor() {
    this.#hash = "sha512";
    this.#disgest = "base64";
  }
  create(key) {
    return crypto.createHash(this.#hash).update(key).digest(this.#disgest);
  }
  validate(key, value) {
    const hash = crypto
      .createHash(this.#hash)
      .update(key)
      .digest(this.#disgest);
    if (hash === value) return true;
    else return false;
  }
  createToken(username) {
    return jwt.sign({ username }, process.env.JWT_KEY, {
      expiresIn: "600m",
    });
  }
  validateToken(token) {
    return jwt.verify(token, process.env.JWT_KEY);
  }
}

module.exports = Auth;
