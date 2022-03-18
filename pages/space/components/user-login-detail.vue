<template>
  <view class="container">
    <Avatar :src="src" />
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
        @click="handleLogin"
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
import Avatar from "components/avatar.vue";
import { defaultAvatarUrl } from "config/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleLogin() {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    },
    handleOffline() {
      uni.clearStorageSync("openId");
      uni.clearStorageSync("userInfo");
      this.$store.commit("setUserInfo", {});
    },
  },
  components: {
    Avatar,
  },
  computed: {
    ...mapState({
      openId: (state) => state.userInfo?.open_id || "",
      userName: (state) => {
        if (!state.userInfo?.open_id) {
          return "未登录";
        }
        return state.userInfo?.nick_name || "懒懒的用户";
      },
      src: (state) => state.userInfo?.avatar_url || defaultAvatarUrl,
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
