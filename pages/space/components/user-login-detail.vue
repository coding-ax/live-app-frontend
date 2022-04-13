<template>
  <view class="container">
    <user
      :src="src"
      :userName="userName"
      :signature="signature"
      :handleAvatarClick="handleAvatarClick"
    />
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
import user from "@/components/user.vue";
export default {
  data() {
    return {};
  },
  components: {
    user,
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
      isLogin: (state) => state.isLogin,
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  @extend .flex-row;
  justify-content: space-between;
  margin-top: $small-size;
  border-bottom: 1px solid #f8f8f8;
  padding: $small-size $standard-size;
}
</style>
