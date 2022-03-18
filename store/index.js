import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: uni.getStorageSync('userInfo') || {}
    },
    mutations: {
        setUserInfo(state, payload) {
            payload ? uni.setStorageSync("userInfo", payload) : uni.clearStorageSync("userInfo");
            payload?.open_id ? uni.setStorageSync("openId", payload.open_id) : uni.clearStorageSync("openId");
            state.userInfo = payload;
        }
    }
})
export default store