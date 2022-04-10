<template>
  <view class="container">
    <view v-if="historyPlanList.length">
      <current-live
        v-for="livePlan in historyPlanList"
        :key="livePlan.liveId"
        :liveId="livePlan.liveId"
        :cover="livePlan.cover"
        :startTime="livePlan.startTime"
        :endTime="livePlan.endTime"
        :title="livePlan.title"
        isInEdit
        isHistory
      ></current-live>
    </view>
    <view v-else class="empty-container">
      <u-empty :icon="src" text="无历史记录"> </u-empty>
    </view>
  </view>
</template>

<script>
import currentLive from "./current-live.vue";
export default {
  components: {
    currentLive,
  },
  props: {
    historyPlanList: {
      type: Array,
      default: () => [],
    },
  },
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
  .empty-container {
    @extend .flex-column;
    justify-content: center;
    height: 80vh;
  }
}
</style>
