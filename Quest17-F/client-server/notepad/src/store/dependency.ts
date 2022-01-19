import { Graphql,Storage } from "@/utils"

export default{
  state(){
    return{
      fileStorage : new Graphql(),
      tabStorage : new Storage(window.localStorage)
    }
  }
}