import { postType } from '../types/post.ts';
import { variablesType } from '../types/variables.ts';
import { apiType } from '../types/api.d.ts';

class GraphQlAPI implements apiType {
  private url : string;

  constructor(url :string) {
    this.url = url;
  }

  private async request(query : string, variables : variablesType) {
    const data : Response = await fetch(`${this.url}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const result : Promise<any> = data.json();
    return result;
  }

  async auth(): Promise<string | false | undefined> {
    try {
      const token : string | null = window.localStorage.getItem('jwt');
      if (!token) return;
      const query :string = `
    query($token : String!)
      {
        user(token : $token){
          username
        }
      }
    `;
      const variables : variablesType = { token };
      const result : any = await this.request(query, variables);
      const { username } = result.data.user;
      if (username) return username;
    } catch (e) {
      return false;
    }
  }

  logOut() : void {
    window.localStorage.removeItem('jwt');
  }

  async login(username :string, password : string) : Promise<string | false | undefined> {
    try {
      const query : string = `
    query($username : String, $password : String)
      {
        login(loginForm : {username : $username, password : $password}){
          token
        }
      }
    `;
      const variables : variablesType = { username, password };
      const result : any = await this.request(query, variables);
      const { token } = result.data.login;
      if (!token) throw new Error();
      window.localStorage.setItem('jwt', token);
      return username;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async checkOverLap(title :string) : Promise<boolean> {
    const posts : any = await this.getFileList();
    const result : Array<postType> = posts.filter((post : postType) => post.title !== title);
    if (result.length === 0) return true;
    return false;
  }

  async getFile(id :string) : Promise<postType | boolean> {
    try {
      const token : string | null = window.localStorage.getItem('jwt');
      const query : string = `
    query($token : String!, $id : String){
        user(token : $token){
         post(id : $id){
           id
           title
           text
        }
      }
    }
    `;
      const variables : variablesType = { token, id };
      const result : any = await this.request(query, variables);
      const { post } = result.data.user;
      return post;
    } catch (e) {
      return false;
    }
  }

  async getFileList() : Promise<Array<postType> | boolean> {
    try {
      const token :string | null = window.localStorage.getItem('jwt');
      const query : string = `
    query($token : String!){
        user(token : $token){
          posts{
            title
            text
            id
          }
        }
    }
    `;
      const variables : variablesType = { token };
      const result : any = await this.request(query, variables);
      const { posts } = result.data.user;
      return posts;
    } catch (e) {
      return false;
    }
  }

  async deleteFile(id :string) : Promise<boolean> {
    try {
      const token : string | null = window.localStorage.getItem('jwt');
      const query : string = `
    mutation($token : String,$id : String){
        deleteFile(id : $id, token : $token){
          error
        }
      }
    `;
      const variables = { token, id };
      const result : any = await this.request(query, variables);
      const { error } = result.data;
      return !error;
    } catch (e) {
      return false;
    }
  }

  async createFile(payLoad : postType) : Promise<postType | boolean> {
    try {
      const token : string | null = window.localStorage.getItem('jwt');
      const { title, text } = payLoad;
      const query : string = `
    mutation($token : String, $title : String, $text : String){
        writeFile(
          payLoad : {
          title : $title,
          text : $text
        }, 
        token : $token)
        {
          title
          text
          id
        }
      }
    `;
      const variables : variablesType = { token, title, text };
      const result : any = await this.request(query, variables);
      const {
        title: newTitle,
        text: newText,
        id: newId,
      } = result.data.writeFile;
      return {
        title: newTitle,
        text: newText,
        id: newId,
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateFile(payLoad : postType) : Promise<postType | boolean> {
    try {
      const token : string | null = window.localStorage.getItem('jwt');
      const { title, text, id } = payLoad;
      const query : string = `
    mutation($token : String, $title : String, $text : String, $id : String){
        writeFile(
          id : $id,
          payLoad : {
          title : $title,
          text : $text
        }, 
        token : $token)
        {
          title
          text
          id
        }
      }
    `;
      const variables : variablesType = {
        token, title, text, id,
      };
      const result : any = await this.request(query, variables);
      const { newTitle, newText, newId } = result.data.writeFile;
      return {
        title: newTitle,
        text: newText,
        id: newId,
      };
    } catch (e) {
      return false;
    }
  }
}

export default GraphQlAPI;
