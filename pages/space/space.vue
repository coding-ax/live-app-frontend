<template>
  <view class="container">
    <user-login-detail />
    <view class="empty">
      <image src="https://live-cdn.xgpax.top/common/set.png"></image>
    </view>
  </view>
</template>

<script>
import UserLoginDetail from "./components/user-login-detail.vue";
export default {
  components: {
    UserLoginDetail,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.container {
  .empty {
    margin-top: 32rpx;
    @extend .flex-column;
    justify-content: center;
    height: 500px;
    image {
      width: 180px;
    }
  }
}
</style>
