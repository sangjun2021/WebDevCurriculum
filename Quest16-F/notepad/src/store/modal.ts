export default{
  namespaced : true,
  state(){
    return{
      isModalOn : false,
    }
  },
  mutations :{
    setIsModalOn(state : {isModalOn : boolean},nextState : boolean ) : void{
      state.isModalOn = nextState;
    }
  },
  actions : {
    modalOn({commit} : {commit : any}) : void{
      commit('setIsModalOn',true);
    },
    modalOff({commit} : {commit : any}) : void{
      commit('setIsModalOn',false);
    },
    async login({commit} : {commit : any},loginForm : {username :string, password : string}) :Promise<void>{
      const {username, password} = loginForm;
      commit('setIsModalOn',false);
    }
  }
}