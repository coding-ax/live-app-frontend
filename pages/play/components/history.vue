<template>
  <view class="container">
    <u-empty :icon="src" text="无历史记录"> </u-empty>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "https://live-cdn.xgpax.top/common/no_content.png",
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  @extend .flex-column;
  justify-content: center;
  height: 90vh;
}
</style>