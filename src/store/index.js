import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    user: {
      displayName: "",
      photoURL: "",
      uid: "",
    },
    form: {
      text:"",
      gif: "",
    },
    isLogin: false //ログインしているかどうか
  },
  mutations: { //stateの値の変更
    setUser(state, currentUser) {
      // commitされるとmutationsのsetUserが実行される
      // ここでユーザー名をstateにセットできる
      state.user.displayName = currentUser.displayName;
      var photo = currentUser.photoURL;
      state.user.photoURL = photo.replace("_normal","");// 同様に写真URLをセットする
      state.user.uid = currentUser.providerData[0].uid;
      if (currentUser !== null){
        state.isLogin = true
      } else {
        state.isLogin = false;
      }
    },
    setGif(state,value){ //gif画像の選択結果の保存
      state.form.gif = value
    },
    setText(state,value) {
      state.form.text = value
    },
    logoutUser(state) { //ログアウトの処理
      state.user.displayName="";
      state.user.photoURL="";
      state.user.uid="";
      state.isLogin = false;
    },
  },
  getters: {
    get_user_photoURL(state) {
      return state.user.photoURL
    },
    get_user_uid(state){
      return state.user.uid
    },
    get_form(state){
      return state.form
    },
    get_isLogin(state) {
      return state.isLogin
    },
    get_API_URL(){
      return process.env.VUE_APP_RAILS_API_POSTS
    }
  },
  actions: {
    setUser({ commit }, currentUser) {
      commit("setUser",currentUser)
    },
    setGif({ commit },value){
      commit("setGif",value)
    },
    logoutUser({ commit }){
      commit("logoutUser")
    }
  }
});
