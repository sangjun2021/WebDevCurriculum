import { Graphql, Storage as localStorage } from "@/utils"
import { postType } from "types"
export default{
  namespaced : true,
  state(){
    return{
      fileList : [],
      fileStorage : new Graphql(),
      tabStorage : new localStorage(window.localStorage)
    }
  },
  mutations :{
    setFileList(state : {fileList : Array<postType>},nextState : Array<postType>) : void{
      state.fileList = nextState
    }
  },
  actions : {
    async createPost({commit} : {commit : any}) : Promise<void>{
      // create
      // getList
      // setList
      // insertTab
    },
    async deletePost({commit} : {commit : any},id : string) : Promise<void>{
      // delete
      // getList
      // setList
      // deleteTab
    },
    async selectPost({commit, state} : {commit : any, state : any},id : string) : Promise<void>{
      // getList
      // insert isSelected
      // setList
      // selectTab
    },
    async updatePost({commit} : {commit : any}, nextState : postType) : Promise<void>{
      // updatePost
      // getList
      // setList
      // updateTab
    }
  }
}