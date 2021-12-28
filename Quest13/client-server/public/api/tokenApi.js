class API {
  #url;
  constructor(url) {
    this.#url = url;
  }
  async #request(url, option) {
    const data = await fetch(`${this.#url}/${url}`, {
      ...option,
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("jwt") || "undefined",
      },
    });
    return data;
  }
  async auth() {
    const result = await this.#request("auth", {
      credentials: "include",
    });
    return result.json();
  }
  async logOut() {
    window.localStorage.removeItem("jwt");
  }
  async login(username, password) {
    const result = await this.#request(`login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await result.json();
    console.log(data);
    window.localStorage.setItem("jwt", data.authKey);
    return data;
  }
  async CheckOverLap(title) {
    const data = await this.#request(`check/${title}`);
    return data.json();
  }
  async getFile(id) {
    const data = await this.#request(`post/${id}`);
    return data.json();
  }
  async getFileList() {
    try {
      const data = await this.#request(`post/list`);
      return data.json();
    } catch (e) {
      return [];
    }
  }
  async deleteFile(id) {
    await this.#request(`post/${id}`, {
      method: "DELETE",
    });
  }
  async createFile(payLoad) {
    const data = await this.#request(`post`, {
      method: "POST",
      body: JSON.stringify(payLoad),
    });
    return data.json();
  }
  async updateFile(payLoad) {
    const data = await this.#request(`post/${payLoad.id}`, {
      method: "PUT",
      body: JSON.stringify(payLoad),
    });
    return data.json();
  }
}

export default API;
