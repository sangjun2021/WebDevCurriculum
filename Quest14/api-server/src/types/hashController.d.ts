export interface hashControllerType{
  createKey(key : string, salt : string) : Promise<{result : string, salt : string}>
  validateKey(key : string, salt : string, value :string) : Promise<boolean>
}
