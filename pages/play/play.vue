<template>
  <view class="container">
    <u-subsection
      :list="list"
      :current="current"
      @change="sectionChange"
    ></u-subsection>
    <view class="tab-box" v-if="isPlan">
      <plan :livePlanList="livePlanList" @refresh="pullDownStart"></plan>
    </view>
    <view class="tab-box" v-else>
      <history :historyPlanList="historyPlanList"></history>
    </view>
  </view>
</template>

<script>
import Plan from "./components/plan.vue";
import History from "./components/history.vue";
import { mapState } from "vuex";
import { getSecretLiveList } from "../../api";
import dayjs from "dayjs";

export default {
  components: {
    Plan,
    History,
  },
  data() {
    return {
      list: ["直播计划", "历史记录"],
      current: 0,
      livePlanList: [],
      historyPlanList: [],
    };
  },
  methods: {
    sectionChange(index) {
      this.current = index;
    },
    pullDownStart() {
      uni.startPullDownRefresh();
    },
    async refreshData() {
      if (!this.isLogin) {
        this.initList();
        return;
      }
      try {
        await this.livePlanQuery();
        await this.historyPlanListQuery();
      } catch (e) {
        this.initList();
      }
    },
    async livePlanQuery() {
      const { data } = await getSecretLiveList({ status: [0, 1] });
      const currentData = data.map((v) => ({
        ...v,
        startTime: dayjs(v.startTime).format("YYYY-MM-DD HH:mm"),
        endTime: dayjs(v.endTime).format("YYYY-MM-DD HH:mm"),
      }));
      this.livePlanList = currentData;
    },
    async historyPlanListQuery() {
      const { data } = await getSecretLiveList({ status: 2 });
      const currentData = data.map((v) => ({
        ...v,
        startTime: dayjs(v.startTime).format("YYYY-MM-DD HH:mm"),
        updateTime: dayjs(v.endTime).format("YYYY-MM-DD HH:mm"),
      }));
      this.historyPlanList = currentData;
      console.log(data);
    },
    initList() {
      this.livePlanList = [];
      this.historyPlanList = [];
    },
  },
  computed: {
    isPlan() {
      return this.current === 0;
    },
    ...mapState({
      isLogin: (state) => state.isLogin,
    }),
  },

  onShow() {
    this.refreshData();
  },
  async onPullDownRefresh() {
    await this.refreshData();
    uni.stopPullDownRefresh();
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
