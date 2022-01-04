export interface onModalEventType{
  () : void
}
export interface offModalEventType{
  () : void
}
export interface makeModalType{
  () : void
}
export interface makeLoginType{
  (target: HTMLElement | null) : void
}
export interface onSubmitType{
  () : void
}

export interface loginType {
  onModalEvent : onModalEventType
  offModalEvent : offModalEventType
  makeModal : makeModalType
  makeLogin : makeLoginType
  onSubmit : onSubmitType
}
