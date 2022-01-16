import { postType } from "types"
export default{
  namespaced : true,
  state(){
    return{
      tabList : []
    }
  },
  mutations :{
    setTabList(state : {tabList : Array<postType>},nextState : Array<postType>) : void{
      state.tabList = nextState
    }
  },
  actions : {
    async createPost({commit} : {commit : any}) : Promise<void>{
      // create
      // getList
      // setList
    },
    async deletePost({commit} : {commit : any},id : string) : Promise<void>{
      // delete
      // getList
      // setList
    },
    async selectPost({commit, state} : {commit : any, state : any},id : string) : Promise<void>{
      // getList
      // insert isSelected
      // setList
    },
    async updatePost({commit} : {commit : any}, nextState : postType) : Promise<void>{
      // updatePost
      // getList
      // setList
    }
  }
}