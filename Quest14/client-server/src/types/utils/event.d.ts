export type eventNameType = 'new' | 'save' | 'save as' | 'logIn'| 'logOut' | 'onKey' | 'updateText' | 'onDeleteFile' | 'onDeleteTab' | 'onClickFile' | 'onClickTab' | 'modalOff' | 'onlogin';

export interface eventType {
  dispatch(type :eventNameType, data : any) : void
  setEvent(type : eventNameType, func : any) : void
}