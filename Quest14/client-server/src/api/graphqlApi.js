class GraphQlAPI {
  #url;
  constructor(url) {
    this.#url = url;
  }
  async #request(query, variables) {
    const data = await fetch(`${this.#url}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const result = data.json();
    return result;
  }
  async auth() {
    try {
      const token = window.localStorage.getItem("jwt");
      if (!token) return;
      const query = `
    query($token : String!)
      {
        user(token : $token){
          username
        }
      }
    `;
      const variables = { token };
      const result = await this.#request(query, variables);
      const { username } = result.data.user;
      if (username) return username;
    } catch (e) {
      return false;
    }
  }
  async logOut() {
    window.localStorage.removeItem("jwt");
  }
  async login(username, password) {
    try {
      const query = `
    query($username : String, $password : String)
      {
        login(loginForm : {username : $username, password : $password}){
          token
        }
      }
    `;
      const variables = { username, password };
      const result = await this.#request(query, variables);
      const { token } = result.data.login;
      if (!token) throw new Error();
      window.localStorage.setItem("jwt", token);
      return { username };
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async CheckOverLap(title) {
    const posts = await this.getFileList();
    const result = posts.filter((post) => post.title !== title);
    if (result.length === 0) return true;
    return false;
  }
  async getFile(id) {
    try {
      const token = window.localStorage.getItem("jwt");
      const query = `
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
      const variables = { token, id };
      const result = await this.#request(query, variables);
      const { post } = result.data.user;
      return post;
    } catch (e) {
      return false;
    }
  }
  async getFileList() {
    try {
      const token = window.localStorage.getItem("jwt");
      const query = `
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
      const variables = { token };
      const result = await this.#request(query, variables);
      const { posts } = result.data.user;
      return posts;
    } catch (e) {
      return false;
    }
  }
  async deleteFile(id) {
    try {
      const token = window.localStorage.getItem("jwt");
      const query = `
    mutation($token : String,$id : String){
        deleteFile(id : $id, token : $token){
          error
        }
      }
    `;
      const variables = { token, id };
      const result = await this.#request(query, variables);
      const { error } = result.data;
      return !error;
    } catch (e) {
      return false;
    }
  }

  async createFile(payLoad) {
    try {
      const token = window.localStorage.getItem("jwt");
      const { title, text } = payLoad;
      const query = `
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
      const variables = { token, title, text };
      const result = await this.#request(query, variables);
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
  async updateFile(payLoad) {
    try {
      const token = window.localStorage.getItem("jwt");
      const { title, text, id } = payLoad;
      const query = `
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
      const variables = { token, title, text, id };
      const result = await this.#request(query, variables);
      return ({ title, text, id } = result.data.writeFile);
    } catch (e) {
      return false;
    }
  }
}

export default GraphQlAPI;
