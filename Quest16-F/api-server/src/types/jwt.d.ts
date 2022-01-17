export interface jwtControllerType{
  createToken(username : string) : string
  validateToken(token : string) : string
}

export interface jwtPayloadType {
  username: string
}
