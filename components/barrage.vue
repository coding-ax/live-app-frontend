<template>
  <view class="barrage">
    <text class="user">{{ barrage.user.nickName }}</text>
    <text class="sep">:</text>
    <text class="content">{{ barrage.barrageContent.content }}</text>
  </view>
</template>

<script>
export default {
  props: {
    barrage: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.barrage {
  @extend .flex-row;
  align-items: baseline;
  margin-top: 12px;

  .base {
    font-size: 14px;
    color: #909399;
  }
  .user {
    @extend .base;
    white-space: nowrap;
  }

  .seq {
    @extend .base;
  }

  .content {
    @extend .base;
  }
}
</style>
