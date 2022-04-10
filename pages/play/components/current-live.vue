<template>
  <view class="container">
    <view class="image">
      <image :src="cover"></image>
      <view class="title">
        <text>{{ title }}</text>
      </view>
    </view>
    <view class="date-container" v-if="isInEdit">
      <view class="date-container-time">
        <view
          >开始时间: <text>{{ startTime }}</text></view
        >
        <view
          >结束时间: <text>{{ endTime }}</text></view
        >
      </view>
      <view class="date-container-btn">
        <view class="date-container-btn-item">
          <u-button
            type="primary"
            icon="edit-pen-fill"
            size="small"
            text="编辑"
            @click="edit"
          ></u-button>
        </view>
        <view class="date-container-btn-item">
          <u-button
            type="primary"
            icon="play-right-fill"
            size="small"
            text="直播"
            @click="play"
          ></u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    liveId: {
      type: String,
    },
    cover: {
      type: String,
    },
    title: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    isInEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    edit() {
      uni.navigateTo({
        url: "/pages/live-plan/live-plan?liveId=" + this.liveId,
      });
    },
    play() {
      uni.navigateTo({
        url: "/pages/live-pusher/live-pusher?liveId=" + this.liveId,
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 12rpx;
  .image {
    position: relative;
    image {
      width: 336px;
      height: 160px;
      border-radius: 10rpx;
    }
    .title {
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      width: 336px;
      box-sizing: border-box;
      padding: 4rpx 10rpx;
      position: absolute;
      bottom: 8rpx;
    }
  }

  .date-container {
    @extend .flex-row;
    justify-content: space-between;
    width: 100%;
    margin-top: 12rpx;

    &-time {
      view {
        font-weight: 600;
      }
      text {
        color: #bdc3c7;
        display: inline-block;
        margin-left: 4px;
        font-weight: normal;
      }
    }
    &-btn {
      @extend .flex-row;
      &-item {
        margin-left: 4px;
      }
    }
  }
}
</style>