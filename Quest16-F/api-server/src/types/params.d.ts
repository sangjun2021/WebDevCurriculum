import { postType } from './post';

export interface paramasType{
  id? : string |undefined,
  token? : string | undefined,
  loginForm? : {username : string | undefined, password : string | undefined}
  payLoad? : postType

}
