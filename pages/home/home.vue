<template>
  <view class="container">
    <view class="empty">
      <u-empty text="暂无内容" :icon="src"></u-empty>
    </view>
    <view class="start-btn" @click="goToPlay">
      <u-icon name="play-circle-fill" color="#3498DB" size="48"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "https://live-cdn.xgpax.top/common/no_live.png",
    };
  },
  methods: {
    goToPlay() {
      uni.switchTab({
        url: "/pages/play/play",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @extend .flex-column;
  justify-content: center;
  height: 100vh;

  .start-btn {
    position: fixed;
    right: $uni-spacing-row-lg;
    bottom: $uni-spacing-col-lg;
  }
}
</style>
