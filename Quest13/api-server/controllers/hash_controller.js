const { pbkdf2Sync } = require("crypto");

class HashController {
  #iterations;
  #keylen;
  #disgest;
  #expression;
  constructor() {
    this.#iterations = 100000;
    this.#keylen = 64;
    this.#disgest = "sha512";
    this.#expression = "hex";
  }
  async createKey(key, salt) {
    const hash = await pbkdf2Sync(
      key,
      salt,
      this.#iterations,
      this.#keylen,
      this.#disgest
    );
    const result = hash.toString(this.#expression);
    return { result, salt };
  }
  async validateKey(key, salt, value) {
    const hash = await pbkdf2Sync(
      key,
      salt,
      this.#iterations,
      this.#keylen,
      this.#disgest
    );
    const result = hash.toString(this.#expression);
    if (result === value) return true;
    else return false;
  }
}

const hashController = new HashController();
module.exports = hashController;