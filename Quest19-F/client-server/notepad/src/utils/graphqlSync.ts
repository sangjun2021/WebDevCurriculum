import {Graphql} from "@/utils"


export default class GraphqlSync{
  private graphql = new Graphql();
  async delete(token:string,id :string) : Promise<void>{
    this.graphql.deletePost(token,id);
  }
  async update(token:string, post : string) : Promise<void>{
    this.graphql.updatePost(token,JSON.parse(post));
  }
}