import {
  postType, variablesType, apiType, graphqlType,
} from '../types';

class GraphQlAPI implements apiType {
  private url : string;

  constructor(url :string) {
    this.url = url;
  }

  private async request(query : string, variables : variablesType) : Promise<graphqlType> {
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
    const result : Promise<graphqlType> = data.json();
    return result;
  }

  async auth(): Promise<string | false> {
    const token : string | null = window.localStorage.getItem('jwt');
    if (!token) return false;
    const query :string = `
    query($token : String!)
      {
        user(token : $token){
          username
        }
      }
    `;
    const variables : variablesType = { token };
    const result : graphqlType = await this.request(query, variables);
    const username : string | undefined = result?.data?.user?.username;
    if (username === undefined) return false;
    return username;
  }

  async logout() : Promise<void> {
    window.localStorage.removeItem('jwt');
  }

  async login(username :string, password : string) : Promise<string | false> {
    const query : string = `
    query($username : String, $password : String)
      {
        login(loginForm : {username : $username, password : $password}){
          token
        }
      }
    `;
    const variables : variablesType = { username, password };
    const result : graphqlType = await this.request(query, variables);
    const token : string | undefined = result?.data?.login?.token;
    if (token === undefined) return false;
    window.localStorage.setItem('jwt', token);
    return username;
  }

  async checkOverLap(title :string) : Promise<boolean> {
    const posts : Array<postType> = await this.getFileList();
    const result : Array<postType> = posts.filter((post : postType) => post.title !== title);
    if (result.length === 0) return true;
    return false;
  }

  async getFile(id :string) : Promise<postType | boolean> {
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
    const post = result.data?.user?.post;
    if (post === undefined) return false;
    return post;
  }

  async getFileList() : Promise<Array<postType>> {
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
    const result : graphqlType = await this.request(query, variables);
    const posts = result.data?.user?.posts;
    if (posts === undefined) return [{}];
    return posts;
  }

  async deleteFile(id :string) : Promise<void> {
    const token : string | null = window.localStorage.getItem('jwt');
    const query : string = `
    mutation($token : String,$id : String){
        deleteFile(id : $id, token : $token){
          error
        }
      }
    `;
    const variables = { token, id };
    await this.request(query, variables);
  }

  async createFile(payLoad : postType) : Promise<postType> {
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
    const newTitle = result.data?.writeFile?.title;
    const newId = result.data?.writeFile?.id;
    const newText = result.data?.writeFile?.text;
    if (newTitle === undefined || newId === undefined || newText === undefined) return {};
    return {
      title: newTitle,
      text: newText,
      id: newId,
    };
  }

  async updateFile(payLoad : postType) : Promise<postType | boolean> {
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
    const newTitle = result.data?.writeFile?.title;
    const newId = result.data?.writeFile?.id;
    const newText = result.data?.writeFile?.text;
    if (newTitle === undefined || newId === undefined || newText === undefined) return {};
    return {
      title: newTitle,
      text: newText,
      id: newId,
    };
  }
}
export default GraphQlAPI;
