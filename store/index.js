import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: uni.getStorageSync('userInfo') || {}
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
        }
    }
})
export default store