const crypto = require("crypto");

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
}

module.exports = Auth;
