import { pbkdf2Sync } from 'crypto';
import { hashControllerType } from '../types/hashController';

class HashController implements hashControllerType {
  private iterations : number;

  private keylen : number;

  private disgest : 'sha512';

  private expression : 'hex';

  constructor() {
    this.iterations = 100000;
    this.keylen = 64;
    this.disgest = 'sha512';
    this.expression = 'hex';
  }

  async createKey(key : string, salt : string) : Promise<{result : string, salt : string}> {
    const hash = await pbkdf2Sync(
      key,
      salt,
      this.iterations,
      this.keylen,
      this.disgest,
    );
    const result = hash.toString(this.expression);
    return { result, salt };
  }

  async validateKey(key : string, salt : string, value :string) : Promise<boolean> {
    const hash = await pbkdf2Sync(
      key,
      salt,
      this.iterations,
      this.keylen,
      this.disgest,
    );
    const result = hash.toString(this.expression);
    if (result === value) return true;
    return false;
  }
}

const hashController = new HashController();
export default hashController;
