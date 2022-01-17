export interface userControllerType{
  createUser(username :string, salt : string, password : string) : Promise<void>
  getUserPasswordList() : Promise<any>
  getUserId(username : string) : Promise<number | undefined>
  setUser(username : string) : Promise<void>
}
