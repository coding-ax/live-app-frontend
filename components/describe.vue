<template>
  <view class="container">
    <view class="container-item" v-for="item in data" :key="item.key">
      <text class="key">{{ item.key }}</text>
      <text class="sep"> : </text>
      <text class="value">{{ item.value }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #000;
  opacity: 0.5;
  padding: 4px;
  border-radius: 4px;
  .container-item {
    @extend .flex-row;
    .key {
      width: 100px;
      font-weight: 600;
      color: #fff;
    }
    .sep {
      color: #fff;
    }

    .value {
      color: #fff;
    }
  }
}
</style>
