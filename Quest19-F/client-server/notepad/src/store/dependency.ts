import { Graphql,Storage, Sync } from "@/utils"

export default{
  state(){
    return{
      fileStorage : new Graphql(),
      tabStorage : new Storage(window.localStorage),
      syncStorage : new Sync(),
    }
  }
}