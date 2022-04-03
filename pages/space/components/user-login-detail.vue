<template>
  <view class="container">
    <view class="default-title">
      <u-avatar
        @click="handleAvatarClick"
        :src="src"
        fontSize="18"
        randomBgColor
      ></u-avatar>
    </view>
    <view class="flex-kid">
      <view>
        <text class="title">{{ userName }}</text>
      </view>
      <view>
        <text class="sub-title">{{ signature }}</text>
      </view>
    </view>
    <view
      ><u-button
        @click="handleLogin('/pages/login/login')"
        v-if="!isLogin"
        type="primary"
        color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
        >立即登录</u-button
      >
      <u-button @click="handleOffline" v-else type="primary">退出登录</u-button>
    </view>
  </view>
</template>

<script>
import { defaultAvatarUrl } from "config/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleLogin(url) {
      uni.navigateTo({
        url,
      });
    },
    handleAvatarClick() {
      this.isLogin && this.handleLogin("/pages/editProfile/editProfile");
    },
    handleOffline() {
      uni.showModal({
        title: "退出登录？",
        content: "你确定要退出登录吗",
        success: ({ confirm }) => {
          if (confirm) {
            this.$store.commit("setUserInfo");
          }
        },
      });
    },
  },
  computed: {
    ...mapState({
      openId: (state) => state.userInfo?.openId || "",
      userName: (state) => {
        if (!state.userInfo?.openId) {
          return "未登录";
        }
        return state.userInfo?.nickName || "懒懒的用户";
      },
      src: (state) => state.userInfo?.avatarUrl || defaultAvatarUrl,
      signature: (state) =>
        state.userInfo?.signature || "这个人很懒，没有留下签名",
    }),
    isLogin() {
      return this.openId ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @extend .flex-row;
  justify-content: space-between;
  margin-top: $small-size;
  background-color: $uni-bg-color;
  padding: $small-size $standard-size;
}
</style>
