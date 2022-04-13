<template>
  <view class="container">
    <view class="image">
      <image :src="backImgSrc"></image>
    </view>
    <view class="list" v-if="livePlanList.length">
      <current-live
        v-for="livePlan in livePlanList"
        :key="livePlan.liveId"
        :liveId="livePlan.liveId"
        :cover="livePlan.cover"
        :startTime="livePlan.startTime"
        :endTime="livePlan.endTime"
        :title="livePlan.title"
        @refresh="emitRefresh"
        isInEdit
      ></current-live>
    </view>
    <view class="empty" v-else>
      <u-empty text="无直播计划" :icon="src">
        <view class="plan-btn" v-if="isLogin">
          <u-button
            text="创建直播计划"
            type="primary"
            @click="goToCreatePlan('/pages/live-plan/live-plan')"
          ></u-button>
        </view>
      </u-empty>
    </view>
  </view>
</template>

<script>
import currentLive from "./current-live.vue";
import { mapState } from "vuex";
export default {
  props: {
    livePlanList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      src: "https://live-cdn.xgpax.top/common/work_schedule.png",
      backImgSrc: "https://live-cdn.xgpax.top/common/live-bg.jpg",
    };
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
    }),
  },
  components: {
    currentLive,
  },
  methods: {
    goToCreatePlan(url) {
      uni.navigateTo({
        url,
      });
    },
    emitRefresh() {
      console.log("emit");
      this.$emit("refresh");
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
      width: 336px;
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
