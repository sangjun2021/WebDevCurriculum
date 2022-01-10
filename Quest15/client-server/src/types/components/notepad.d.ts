import { handleApiType } from './handleApi';
import { storageType } from '../utils/storage';

export interface notepadArgsType{
    editorTarget : HTMLElement
    tabTarget : HTMLElement
    buttonTarget :HTMLElement
    filesTarget : HTMLElement
    fileStorage : handleApiType
    tabStorage : storageType
}
