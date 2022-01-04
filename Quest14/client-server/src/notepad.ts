import Storage from './utils/Storage';
import Event from './utils/Event';
import Button from './components/Button';
import Editor from './components/Editor';
import Tab from './components/Tab';
import Files from './components/Files';
import HandleApi from './utils/HandleAPI';
import Login from './components/Login';
import API from './api/graphQLApi';
import { notepadArgType, notepadArgType } from './types/notepad';
import { postType } from './types/post';

class Notepad {
  private isLoading : boolean = false;

  private tabStorage;

  private fileStorage;

  private event = new Event();

  private state : postType;

  private editor;

  private tab;

  private files;

  private button;

  login = new Login();

  constructor({
    editorTarget,
    tabTarget,
    buttonTarget,
    filesTarget,
    fileStorage,
    tabStorage,
  } : notepadArgType) {
    this.state = { id: '' };
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

  // api
  private async checkTitle() : Promise<void> {
    const auth = await this.fileStorage.auth();
    if (!auth) {
      alert('로그인을 먼저 해주세요');
      return;
    }
    const title = prompt('이름을 입력해주세요');
    const checking = await this.fileStorage.checkOverLap(title);
    if (checking) return true;
    this.setState({ ...this.state, title });
  }

  // api
  private async saveFile() : Promise<void> {
    const auth = await this.fileStorage.auth();
    if (!auth) {
      alert('로그인을 먼저 해주세요');
      return;
    }
    await this.fileStorage.updateFile(this.state);
    this.tabStorage.updateFile(this.state);
    const { id } = this.state;
    await this.files.setState(id);
    this.tab.setState(id);
  }

  // api
  private setNewEvent() : void {
    this.event.setEvent('new', async () => {
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      try {
        if (this.isLoading) return;

        this.isLoading = true;
        const nextState = await this.fileStorage.createFile();
        this.tabStorage.insertFile(nextState);
        this.setState(nextState);
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
      } catch (e) {
        alert(e.message);
        this.isLoading = false;
      }
    });
  }

  private setSaveAsEvent() : void {
    this.event.setEvent('save as', async () => {
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const checking : boolean = await this.checkTitle();
        if (checking) throw new Error('중복된 이름입니다.');
        await this.saveFile();
        this.isLoading = false;
      } catch (e) {
        alert(e.message);
        this.isLoading = false;
      }
    });
  }

  // api
  private setFileDeleteEvent() : void {
    this.event.setEvent('onDeleteFile', async (e) => {
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      if (!confirm('정말 삭제하시겠습니까?')) return;
      this.tabStorage.removeFile(e.detail);
      await this.fileStorage.removeFile(e.detail);
      if (this.state.id === e.detail) {
        const list = await this.fileStorage.getList();
        const nextState = list[0] || { id: null };
        this.setState(nextState);
        this.editor.setState(nextState.id);
      }
      const { id } = this.state;
      this.files.setState(id);
      this.tab.setState(id);
    });
  }

  private setTabDeleteEvent() : void {
    this.event.setEvent('onDeleteTab', (e) => {
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
    this.event.setEvent('onClickFile', async (e) => {
      const auth = await this.fileStorage.auth();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      const data = await this.fileStorage.getFile(e.detail);
      this.tabStorage.insertFile(data);
      this.setState(data);
      this.editor.setState(this.state.id);
    });
  }

  private setTabClickEvent() : void {
    this.event.setEvent('onClickTab', (e) => {
      const nextState = this.tabStorage.getFile(e.detail);
      this.setState(nextState);
      this.editor.setState(this.state.id);
    });
  }

  private setLoginEvent() : void {
    this.event.setEvent('onlogin', async (e) => {
      const { id, password } = e.detail;
      const result = await this.fileStorage.login(id, password);
      if (!result) {
        alert('아아디 혹은 비밀번호가 올바르지 않습니다.');
        return;
      }
      await this.init();
      this.event.dispatch('onKey', result.username);
      this.event.dispatch('modalOff');
    });
  }

  private setLogOutEvent() : void {
    this.event.setEvent('logOut', async () => {
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
    this.event.setEvent('updateText', (e) => {
      this.state = { ...this.state, text: e.detail };
      this.tabStorage.updateFile({ ...this.state, edit: true });
      this.tab.setState(this.state.id);
    });
  }

  private setState(nextState) : void {
    this.state = nextState;
    const { id } = this.state;
    this.tab.setState(id);
    this.files.setState(id);
  }

  async init() : Promise<void> {
    const auth = await this.fileStorage.auth();
    if (!auth) return;
    this.event.dispatch('onKey', auth);
    const currentPage = this.tabStorage.getCurrentPage();
    const nextState = { id: currentPage };
    this.setState(nextState);
    this.editor.setState(nextState.id);
  }
}

const editorTarget : HTMLElement | null = document.querySelector('.text-editor');
const tabTarget : HTMLElement | null = document.querySelector('.tab-list');
const buttonTarget : HTMLElement | null = document.querySelector('.button-container');
const filesTarget : HTMLElement | null = document.querySelector('.file-container');

new Notepad({
  editorTarget,
  tabTarget,
  buttonTarget,
  filesTarget,
  tabStorage: new Storage(window.localStorage),
  fileStorage: new HandleApi(new API('https://localhost:443')),
});
