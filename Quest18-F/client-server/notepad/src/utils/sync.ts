import { postType } from "@/types";

export default class Sync{
  async sendSync(tag : string) : Promise<void>{
    const res : any = await navigator.serviceWorker.ready;
    res.sync.register(tag);
  }
  updatePost(token : string,post : postType){
    const payLoad = `update?sync?${token}?sync?${JSON.stringify(post)}`;
    this.sendSync(payLoad);
  }
  deletePost(token : string,id : string){
    const payLoad = `delete?sync?${token}?sync?${id}`;
    this.sendSync(payLoad);
  }
}