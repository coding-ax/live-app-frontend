<template>
  <view class="container">
    <view class="default-title">
      <u-avatar
        @click="handleAvatarClick"
        :src="src"
        fontSize="18"
        randomBgColor
      ></u-avatar>
    </view>
    <view class="flex-kid">
      <view>
        <text class="title">{{ userName }}</text>
      </view>
      <view>
        <text class="sub-title">{{ signature }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { defaultAvatarUrl } from "@/config";
export default {
  props: {
    src: {
      type: String,
      default: defaultAvatarUrl,
    },
    userName: {
      type: String,
      default: "暂无",
    },
    signature: {
      type: String,
      default: "暂无签名",
    },
    handleAvatarClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @extend .flex-row;
  justify-content: space-between;
}
</style>