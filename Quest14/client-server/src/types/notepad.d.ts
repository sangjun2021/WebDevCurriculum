import { handleApiType } from './handleApi';
import { storageType } from './storage';

export interface notepadArgsType{
    editorTarget : HTMLElement | null
    tabTarget : HTMLElement | null
    buttonTarget :HTMLElement | null
    filesTarget : HTMLElement | null
    fileStorage : handleApiType | null
    tabStorage : storageType | null
}
