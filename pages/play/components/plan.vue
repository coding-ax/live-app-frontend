<template>
  <view class="container">
    <view class="image">
      <image :src="backImgSrc"></image>
    </view>
    <view class="empty">
      <u-empty text="无直播计划" :icon="src">
        <view class="plan-btn">
          <u-button
            text="创建直播计划"
            type="primary"
            @click="goToCreatePlan"
          ></u-button>
        </view>
      </u-empty>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "https://live-cdn.xgpax.top/common/work_schedule.png",
      backImgSrc: "https://live-cdn.xgpax.top/common/live-bg.jpg",
    };
  },
  methods: {
    goToCreatePlan() {
      uni.navigateTo({
        url: "/pages/live-plan/live-plan",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .image {
    image {
      border-radius: 28rpx;
      width: 320px;
      height: 160px;
    }
  }
  .empty {
    margin-top: 16rpx;
    .plan-btn {
      margin-top: 20px;
    }
  }
}
</style>