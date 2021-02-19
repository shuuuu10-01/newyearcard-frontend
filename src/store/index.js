import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    user: {
      displayName: "",
      photoURL: "",
      uid: "",
      idToken: ""
    },
    form: {
      text:"",
      gif: "",
    },
    isLogin: false, //ログインしているかどうか
    position: {
      top: "",
      left: "",
      width: "",
      height: "",
      select: false
    }
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
    setToken(state,idToken){
      state.user.idToken = idToken
    },
    setGif(state,value){ //gif画像の選択結果の保存
      state.form.gif = value
    },
    setText(state,value) {
      state.form.text = value
    },
    setName(state,value) {
      state.user.displayName = value
    },
    logoutUser(state) { //ログアウトの処理
      state.user.displayName="";
      state.user.photoURL="";
      state.user.uid="";
      state.isLogin = false;
      state.user.idToken+"";
    },
    setPosition(state,value){
      state.position.top = value.top
      state.position.left = value.left
      state.position.height = value.height
      state.position.width = value.width
      state.position.select = value.select
    }
  },
  getters: {
    get_user_photoURL(state) {
      return state.user.photoURL
    },
    get_user_uid(state){
      return state.user.uid
    },
    get_user_displayName(state){
      return state.user.displayName
    },
    get_form(state){
      return state.form
    },
    get_isLogin(state) {
      return state.isLogin
    },
    get_position(state){
      return state.position
    },
    get_API_URL(){
      return process.env.VUE_APP_RAILS_API_POSTS
    },
    get_API_TWITTER() {
      return process.env.VUE_APP_RAILS_API_TWITTER
    },
    get_API_RECIEVE(){
      return process.env.VUE_APP_RAILS_API_RECIEVE
    },
    get_ACCESS_TOKEN(state){
      return {headers:{'idToken': state.user.idToken}}
    }
  },
  actions: {
    async auth({ commit }) {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(currentUser => {
          currentUser.getIdToken(true).then(function (idToken) {
            commit("setUser", currentUser);
            commit("setToken", idToken);
            const data = {
              uid: currentUser.providerData[0].uid,
              idToken: idToken
            }
            console.log("axios", data)
            axios.post(process.env.VUE_APP_RAILS_API_SET, data).then(() => {
              console.log("dsf")
              resolve()
            })
          })
        })
      })
    },
    async setUser({ commit }, currentUser) {
      commit("setUser",currentUser)
    },
    setGif({ commit },value){
      commit("setGif",value)
    },
    logoutUser({ commit }){
      commit("logoutUser")
    },
    setPosition({commit},value){
      commit("setPosition",value)
    }
  }
});
