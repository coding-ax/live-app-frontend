<template>
  <view class="barrage">
    <view class="user">{{ barrage.user.nickName }}</view>
    <view class="sep">{{ ` : ` }}</view>
    <view class="content">{{ barrage.barrageContent.content }}</view>
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
  display: flex;
  margin-top: 12px;
  .user {
    font-size: 14px;
    color: #909399;
  }

  .seq {
    color: #909399;
    margin-right: 4px;
  }

  .content {
    font-size: 14px;
  }
}
</style>
