export interface notepadType{
  checkTitle
  saveFile
  setNewEvent
  setSaveEvent
  setSaveAsEvent
  setFileDeleteEvent
  setTabDeleteEvent
  setFileClickEvent
  setTabClickEvent
  setLoginEvent
  setLogOutEvent
  setInputEvent
  setState
  init
}

export interface notepadArgType{
  editorTarget : HTMLElement,
  tabTarget : HTMLElement,
  buttonTarget : HTMLElement,
  filesTarget : HTMLElement,
  tabStorage: any,
  fileStorage: any,
}
