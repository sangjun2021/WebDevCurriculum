export type eventNameType = 'new' | 'save' | 'save as' | 'logIn'| 'logOut';
export interface dispatchType{
  (type : eventNameType, data : any) : void
}
export interface setEventType{
  (type :eventNameType, func : any) : void
}

export interface eventType {
  dispatch : eventNameType
  setEvent : setEventType
}
