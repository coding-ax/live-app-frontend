<template>
  <view class="container">
    <u-subsection
      :list="list"
      :current="current"
      @change="sectionChange"
    ></u-subsection>
    <view class="tab-box" v-if="isPlan">
      <plan></plan>
    </view>
    <view class="tab-box" v-else>
      <history></history>
    </view>
  </view>
</template>

<script>
import Plan from "./components/plan.vue";
import History from "./components/history.vue";

export default {
  components: {
    Plan,
    History,
  },
  data() {
    return {
      list: ["直播计划", "历史记录"],
      current: 0,
    };
  },
  computed: {
    isPlan() {
      return this.current === 0;
    },
  },
  methods: {
    sectionChange(index) {
      this.current = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @extend .flex-column;
  height: 80vh;
  .tab-box {
    @extend .flex-column;
    margin-top: 8rpx;
  }
}
</style>
