import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { jwtControllerType, jwtPayloadType } from '../types/jwt';

dotenv.config();

class JwtController implements jwtControllerType {
  createToken(username : string) : string {
    return jwt.sign({ username }, process.env.JWT_KEY, {
      expiresIn: '600m',
    });
  }

  validateToken(token : string) : string {
    const result = jwt.verify(token, process.env.JWT_KEY) as jwtPayloadType;
    return result.username;
  }
}
const jwtController = new JwtController();

export default jwtController;
