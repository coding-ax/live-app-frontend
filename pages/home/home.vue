<template>
  <view class="container">
    <view class="start-btn" @click="goToPlay">
      <u-icon name="play-circle-fill" color="#3498DB" size="48"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
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
  .start-btn {
    position: fixed;
    right: $uni-spacing-row-lg;
    bottom: $uni-spacing-col-lg;
  }
}
</style>
