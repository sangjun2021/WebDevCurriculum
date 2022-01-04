export interface userServcieType{
  createUser(username : string, salt :string, password : string) : Promise<void>
  getUserId(username : string) : Promise<number | undefined>
  getUserPasswordList() : Promise<any>
}
