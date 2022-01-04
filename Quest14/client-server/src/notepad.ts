import Storage from './utils/Storage.js';
import Event from './utils/Event.js';
import Button from './components/Button.js';
import Editor from './components/Editor.js';
import Tab from './components/Tab.js';
import Files from './components/Files.js';
import HandleApi from './utils/HandleApi.js';
import Login from './components/Login.js';
import API from './api/graphqlApi.js';
import { notepadArgsType } from './types/notepad';
import { postType } from './types/post';
import { handleApiType } from './types/handleApi';
import { storageType } from './types/storage';
import { eventType } from './types/event';
import { editorType } from './types/editor';
import { tabType } from './types/tab';
import { filesType } from './types/file';
import { buttonType } from './types/button';
import { apiType } from './types/api';

class Notepad {
  private isLoading : boolean = false;

  private tabStorage : storageType | null = null;

  private fileStorage : handleApiType | null = null;

  private event : eventType = new Event();

  private state : postType;

  private editor : editorType | null = null;

  private tab : tabType | null = null;

  private files : filesType | null = null;

  private button : buttonType | null = null;

  login : any = new Login();

  constructor({
    editorTarget,
    tabTarget,
    buttonTarget,
    filesTarget,
    fileStorage,
    tabStorage,
  } : notepadArgsType) {
    this.state = { id: '' };
    if (editorTarget === null || tabTarget === null || buttonTarget === null || filesTarget === null) return;
    this.editor = new Editor(editorTarget);
    this.tab = new Tab(tabTarget);
    this.files = new Files(filesTarget, fileStorage);
    this.button = new Button(buttonTarget);
    this.fileStorage = fileStorage;
    this.tabStorage = tabStorage;
    this.button.createButton('new');
    this.button.createButton('save');
    this.button.createButton('save as');
    this.button.createButton('logIn');
    this.button.createButton('logOut');
    this.setNewEvent();
    this.setSaveEvent();
    this.setSaveAsEvent();
    this.setInputEvent();
    this.setTabClickEvent();
    this.setTabDeleteEvent();
    this.setFileDeleteEvent();
    this.setFileClickEvent();
    this.setLoginEvent();
    this.setLogOutEvent();
    this.init();
  }

  private async checkTitle() : Promise<void | boolean> {
    if (this.fileStorage === null) return;
    const auth = await this.fileStorage.auth();
    if (!auth) {
      alert('로그인을 먼저 해주세요');
      return;
    }
    const title : string | null = prompt('이름을 입력해주세요');
    if (title === null) return;
    const checking = await this.fileStorage.checkOverLap(title);
    if (!checking) return true;
    this.setState({ ...this.state, title });
  }

  // api
  private async saveFile() : Promise<void> {
    if (this.fileStorage === null) return;
    const auth = await this.fileStorage.auth();
    if (!auth) {
      alert('로그인을 먼저 해주세요');
      return;
    }
    await this.fileStorage.updateFile(this.state);
    if (this.tabStorage === null) return;
    this.tabStorage.updateFile(this.state);
    const { id } = this.state;
    if (this.files === null) return;
    await this.files.setState();
    if (this.tab === null) return;
    this.tab.setState(id);
  }

  // api
  private setNewEvent() : void {
    this.event.setEvent('new', async () => {
      if (this.fileStorage === null) return;
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      try {
        if (this.isLoading) return;

        this.isLoading = true;
        const nextState = await this.fileStorage.createFile();
        if (this.tabStorage === null) return;
        this.tabStorage.insertFile(nextState);
        this.setState(nextState);
        if (this.editor === null) return;
        this.editor.setState(this.state.id);
        this.isLoading = false;
      } catch (e) {
        console.log(e);
        this.isLoading = false;
      }
    });
  }

  // api
  private async setSaveEvent() : Promise<void> {
    this.event.setEvent('save', async () => {
      if (this.fileStorage === null) return;
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        let checking : boolean | void = false;
        if (this.state.title === 'untitled') {
          checking = await this.checkTitle();
        }
        if (checking) throw new Error('중복된 이름입니다.');
        await this.saveFile();
        this.isLoading = false;
      } catch (e : any) {
        alert(e.message);
        this.isLoading = false;
      }
    });
  }

  private setSaveAsEvent() : void {
    this.event.setEvent('save as', async () => {
      if (this.fileStorage === null) return;
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const checking : boolean | void = await this.checkTitle();
        if (checking) throw new Error('중복된 이름입니다.');
        await this.saveFile();
        this.isLoading = false;
      } catch (e : any) {
        alert(e.message);
        this.isLoading = false;
      }
    });
  }

  // api
  private setFileDeleteEvent() : void {
    this.event.setEvent('onDeleteFile', async (e : any) => {
      if (this.fileStorage === null) return;
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      if (!confirm('정말 삭제하시겠습니까?')) return;
      if (this.tabStorage === null) return;
      this.tabStorage.removeFile(e.detail);
      await this.fileStorage.removeFile(e.detail);
      if (this.state.id === e.detail) {
        const list = await this.fileStorage.getList();
        const nextState : postType | boolean = list[0] || {};
        this.setState(nextState);
        if (typeof nextState === 'boolean') return;
        if (this.editor === null) return;
        this.editor.setState(nextState.id);
      }
      const { id } = this.state;
      if (this.files === null) return;
      if (this.tab === null) return;
      this.files.setState();
      this.tab.setState(id);
    });
  }

  private setTabDeleteEvent() : void {
    this.event.setEvent('onDeleteTab', (e : any) => {
      if (this.tabStorage === null) return;
      if (this.editor === null) return;
      if (this.tab === null) return;
      const removeTab = this.tabStorage.getFile(e.detail);
      if (
        removeTab.isEdited
        && !confirm('저장되지 않은탭입니다. 정말 삭제하시겠습니까?')
      ) { return; }
      this.tabStorage.removeFile(e.detail);
      if (this.state.id === e.detail) {
        const nextState = this.tabStorage.getList()[0] || { id: null };
        this.setState(nextState);
        this.editor.setState(this.state.id);
      }
      this.tab.setState(this.state.id);
    });
  }

  // api
  private setFileClickEvent() : void {
    this.event.setEvent('onClickFile', async (e : any) => {
      if (this.fileStorage === null) return;
      if (this.editor === null) return;
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      const data = await this.fileStorage.getFile(e.detail);
      if (this.tabStorage === null) return;
      this.tabStorage.insertFile(data);
      this.setState(data);
      this.editor.setState(this.state.id);
    });
  }

  private setTabClickEvent() : void {
    this.event.setEvent('onClickTab', (e : any) => {
      if (this.tabStorage === null) return;
      if (this.editor === null) return;
      const nextState = this.tabStorage.getFile(e.detail);
      this.setState(nextState);
      this.editor.setState(this.state.id);
    });
  }

  private setLoginEvent() : void {
    this.event.setEvent('onlogin', async (e : any) => {
      const { id, password } = e.detail;
      if (this.fileStorage === null) return;
      const result = await this.fileStorage.login(id, password);
      if (!result) {
        alert('아아디 혹은 비밀번호가 올바르지 않습니다.');
        return;
      }
      await this.init();
      this.event.dispatch('onKey', result);
      this.event.dispatch('modalOff', null);
    });
  }

  private setLogOutEvent() : void {
    this.event.setEvent('logOut', async () => {
      if (this.fileStorage === null) return;
      if (this.tabStorage === null) return;
      if (this.editor === null) return;
      if (this.tab === null) return;
      if (this.files === null) return;
      await this.fileStorage.logOut();
      this.event.dispatch('onKey', '');
      const currentPage = this.tabStorage.getCurrentPage();
      const nextState = { id: currentPage };
      this.editor.setState(nextState.id);
      this.files.logout();
      this.tab.logout();
    });
  }

  private setInputEvent() : void {
    this.event.setEvent('updateText', (e : any) => {
      if (this.tab === null) return;
      if (this.tabStorage === null) return;
      this.state = { ...this.state, text: e.detail };
      this.tabStorage.updateFile({ ...this.state, isEdited: true });
      this.tab.setState(this.state.id);
    });
  }

  private setState(nextState: postType | boolean) : void {
    if (typeof nextState === 'boolean') return;
    if (this.tab === null) return;
    if (this.files === null) return;
    this.state = nextState;
    const { id } = this.state;
    this.tab.setState(id);
    this.files.setState();
  }

  async init() : Promise<void> {
    if (this.fileStorage === null) return;
    if (this.tabStorage === null) return;
    if (this.editor === null) return;
    const auth = await this.fileStorage.auth();
    if (!auth) return;
    this.event.dispatch('onKey', auth);
    const currentPage = this.tabStorage.getCurrentPage();
    const nextState = { id: currentPage };
    if (nextState.id === undefined) return;
    this.setState(nextState);
    this.editor.setState(nextState.id);
  }
}

const editorTarget : HTMLElement | null = document.querySelector('.text-editor');
const tabTarget : HTMLElement | null = document.querySelector('.tab-list');
const buttonTarget : HTMLElement | null = document.querySelector('.button-container');
const filesTarget : HTMLElement | null = document.querySelector('.file-container');
const api : apiType = new API('https://localhost:443');
const handleApi : handleApiType = new HandleApi(api);
const storage = new Storage(window.localStorage);
new Notepad({
  editorTarget,
  tabTarget,
  buttonTarget,
  filesTarget,
  tabStorage: storage,
  fileStorage: handleApi,
});
