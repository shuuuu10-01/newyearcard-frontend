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
    isLogin: false
  },
  mutations: {
    setUser(state, currentUser) {
      // commitされるとmutationsのsetUserが実行される
      state.user.displayName = currentUser.displayName; // ここでユーザー名をstateにセットできる
      var photo = currentUser.photoURL;
      state.user.photoURL = photo.replace("_normal","");// 同様に写真URLをセットする
      state.user.uid = currentUser.providerData[0].uid;
      if (currentUser !== null){
        state.isLogin = true
      } else {
        state.isLogin = false;
      }
    },
  }
});
