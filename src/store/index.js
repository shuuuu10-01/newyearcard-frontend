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
        console.log("first")
      } else {
        state.isLogin = false;
      }
    },
  },
  getters: {
    get_photoURL(state) {
      return state.user.photoURL
    },
    get_isLogin(state) {
      return state.isLogin
    }
  },
});
