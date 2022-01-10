import { postType } from '../utils/post';
import { storageType } from '../utils/storage';

export interface listArgsType{
  targetElement : HTMLElement
  className : string
  deleteEvent : any
  clickEvent : any
  storage : storageType
}

export interface listType{
  setState(id : string | undefined) : Promise<void>
  setStateByList(nextState : Array<postType| boolean>) : void
}
