export interface localStorageType{
  getItem(key :string) : string,
  setItem(key : string, value : string) : void
}