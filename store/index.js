import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: uni.getStorageSync('userInfo') || {},
        isLogin: uni.getStorageSync('openId') ? true : false,
    },
    mutations: {
        setUserInfo(state, payload) {
            payload ? uni.setStorageSync("userInfo", payload) : uni.clearStorageSync("userInfo");
            payload?.openId ? uni.setStorageSync("openId", payload.openId) : uni.clearStorageSync("openId");
            state.userInfo = payload;
            // 判断是否登录
            state.isLogin = payload?.openId ? true : false;
        }
    }
})
export default store