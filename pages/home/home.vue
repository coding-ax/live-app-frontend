<template>
  <view class="container">
    <view class="empty">
      <u-empty text="暂无内容" :icon="src"></u-empty>
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
  methods: {},
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
