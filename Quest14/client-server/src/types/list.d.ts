import { postType } from './post';

export interface listArgsType{
  targetElement : HTMLElement
  className : string
  deleteEvent : any
  clickEvent : any
  storage : any
}

export interface listType{
  setState(id : string | undefined) : void
  setStateByList(nextState : Array<postType| boolean>) : void
}
