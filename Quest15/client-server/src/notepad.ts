import {
  buttonType, editorType, filesType, loginType, postType, storageType, tabType, eventType, notepadArgsType, apiType, elementType,
} from './types';
import {
  Button, Editor, Files, Tab, Login,
} from './components/index.js';
import {
  HandleApi, Storage, Event, Element,
} from './utils/index.js';
import GraphQlAPI from './api/graphqlApi.js';

class Notepad {
  private isLoading : boolean = false;

  private tabStorage : storageType;

  private fileStorage : storageType;

  private event : eventType = new Event();

  private state : postType = {};

  private editor : editorType;

  private tab : tabType;

  private files : filesType;

  private button : buttonType;

  private login : loginType = new Login();

  constructor({
    editorTarget,
    tabTarget,
    buttonTarget,
    filesTarget,
    fileStorage,
    tabStorage,
  } : notepadArgsType) {
    this.editor = new Editor(editorTarget);
    this.tab = new Tab(tabTarget, tabStorage);
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
    const auth = await this.fileStorage.auth?.();
    if (!auth) {
      alert('로그인을 먼저 해주세요');
      return;
    }
    const title : string | null = prompt('이름을 입력해주세요');
    if (title === null) return;
    const checking = await this.fileStorage.checkOverLap(title);
    if (checking) return true;
    this.setState({ ...this.state, title });
  }

  // api
  private async saveFile() : Promise<void> {
    const auth = await this.fileStorage.auth?.();
    if (!auth) {
      alert('로그인을 먼저 해주세요');
      return;
    }
    await this.fileStorage.updateFile(this.state);
    await this.tabStorage.updateFile(this.state);
    const { id } = this.state;
    await this.files.setState();
    this.tab.setState(id);
  }

  // api
  private setNewEvent() : void {
    this.event.setEvent('new', async () => {
      const auth = await this.fileStorage.auth?.();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      try {
        if (this.isLoading) return;
        this.isLoading = true;
        const nextState = await this.fileStorage.createFile();
        await this.tabStorage.insertFile(nextState);
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
      const auth = await this.fileStorage.auth?.();
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
      const auth = await this.fileStorage.auth?.();
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
      const auth = await this.fileStorage.auth?.();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      if (!confirm('정말 삭제하시겠습니까?')) return;

      await this.tabStorage.removeFile(e.detail);
      await this.fileStorage.removeFile(e.detail);
      if (this.state.id === e.detail) {
        const list = await this.fileStorage.getList();
        const nextState : postType = list[0] || {};
        this.setState(nextState);
        this.editor.setState(nextState.id);
      }
      const { id } = this.state;

      this.files.setState();
      this.tab.setState(id);
    });
  }

  private setTabDeleteEvent() : void {
    this.event.setEvent('onDeleteTab', async (e : any) => {
      const removeTab = await this.tabStorage.getFile(e.detail);
      if (
        removeTab.isEdited
        && !confirm('저장되지 않은탭입니다. 정말 삭제하시겠습니까?')
      ) { return; }
      this.tabStorage.removeFile(e.detail);
      if (this.state.id === e.detail) {
        const nextList = await this.tabStorage.getList();
        const nextState = nextList.length ? nextList[0] : { id: null };
        this.setState(nextState);
        this.editor.setState(this.state.id);
      }
      this.tab.setState(this.state.id);
    });
  }

  // api
  private setFileClickEvent() : void {
    this.event.setEvent('onClickFile', async (e : any) => {
      const auth = await this.fileStorage.auth?.();
      if (!auth) {
        alert('로그인을 먼저 해주세요');
        return;
      }
      const data = await this.fileStorage.getFile(e.detail);

      await this.tabStorage.insertFile(data);
      this.setState(data);
      this.editor.setState(this.state.id);
    });
  }

  private setTabClickEvent() : void {
    this.event.setEvent('onClickTab', async (e : any) => {
      const nextState = await this.tabStorage.getFile(e.detail);
      this.setState(nextState);
      this.editor.setState(this.state.id);
    });
  }

  private setLoginEvent() : void {
    this.event.setEvent('onlogin', async (e : any) => {
      const { id, password } = e.detail;

      const result = await this.fileStorage.login?.(id, password);
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
      await this.fileStorage.logOut?.();
      this.event.dispatch('onKey', '');
      const currentPage = await this.tabStorage.getCurrentPage?.();
      const nextState = { id: currentPage };
      this.editor.setState(nextState.id);
      this.files.logout();
      this.tab.logout();
    });
  }

  private setInputEvent() : void {
    this.event.setEvent('updateText', async (e : any) => {
      this.state = { ...this.state, text: e.detail };
      await this.tabStorage.updateFile({ ...this.state, isEdited: true });
      this.tab.setState(this.state.id);
    });
  }

  private setState(nextState: postType | undefined) : void {
    if (nextState === undefined) return;
    this.state = nextState;
    const { id } = this.state;
    this.tab.setState(id);
    this.files.setState();
  }

  async init() : Promise<void> {
    const auth = await this.fileStorage.auth?.();
    if (!auth) return;
    this.event.dispatch('onKey', auth);
    const currentPage = this.tabStorage.getCurrentPage?.();
    const nextState = { id: currentPage };
    if (nextState.id === undefined) return;
    this.setState(nextState);
    this.editor.setState(nextState.id);
  }
}

const api : apiType = new GraphQlAPI('https://localhost:443');
const handleApi : storageType = new HandleApi(api);
const storage : storageType = new Storage(window.localStorage);
const element : elementType = new Element();
new Notepad({
  editorTarget: element.editorTarget,
  tabTarget: element.tabTarget,
  buttonTarget: element.buttonTarget,
  filesTarget: element.filesTarget,
  tabStorage: storage,
  fileStorage: handleApi,
});
