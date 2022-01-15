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
    updateTabList({commit} : {commit : any},nextState : Array<postType>) : void{
      commit('setTabList',nextState);
    },
  }
}