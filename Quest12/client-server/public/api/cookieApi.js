// post 새파일 생성
// put 파일 수정 (다른이름으로 저장 할시 파라미터 추가, 내용수정할시 파라미터 수정)
// get 파일 읽기
// delete 파일 삭제

class API {
  #url;
  constructor(url) {
    this.#url = url;
  }
  async #request(url, option) {
    const data = await fetch(`${this.#url}/${url}`, option);
    return data;
  }
  async auth() {
    const result = await this.#request("auth", {
      credentials: "include",
    });
    result.json();
    return result;
  }
  async logOut() {
    try {
      await this.#request("logout", {
        method: "DELETE",
        credentials: "include",
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  async login(username, password) {
    const data = await this.#request(`login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    data.json();
    return data;
  }
  async CheckOverLap(title) {
    const data = await this.#request(`check/${title}`);
    data.json();
    return data;
  }
  async getFile(id) {
    const data = await this.#request(`post/${id}`);
    data.json();
    return data;
  }
  async getFileList() {
    try {
      const data = await this.#request(`post/list`);
      data.json();
      return data;
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });
    data.json();
    return data;
  }
  async updateFile(payLoad) {
    const data = await this.#request(`post/${payLoad.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });
    data.json();
    return data;
  }
}

export default API;
