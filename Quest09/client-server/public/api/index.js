// post 새파일 생성
// put 파일 수정 (다른이름으로 저장 할시 파라미터 추가, 내용수정할시 파라미터 수정)
// get 파일 읽기
// delete 파일 삭제
class API {
  #url;
  constructor(url) {
    this.#url = url;
  }
  async CheckOverLap(title) {
    const data = await fetch(`${this.#url}/check/${title}`).then((res) =>
      res.json()
    );
    return data;
  }
  async getFile(id) {
    const data = await fetch(`${this.#url}/post/${id}`).then((res) =>
      res.json()
    );
    return data;
  }
  async getFileList() {
    const data = await fetch(`${this.#url}/post/list`).then((res) =>
      res.json()
    );
    return data;
  }
  async deleteFile(id) {
    await fetch(`${this.#url}/post/${id}`, {
      method: "DELETE",
    });
  }
  async createFile(payLoad) {
    const data = await fetch(`${this.#url}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    }).then((res) => res.json());
    return data;
  }
  async updateFile(payLoad) {
    const data = await fetch(`${this.#url}/post/${payLoad.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    }).then((res) => res.json());
    return data;
  }
}

export default API;
