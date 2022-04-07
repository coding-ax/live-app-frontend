<template>
  <view class="container">
    <u-subsection
      :list="list"
      :current="current"
      @change="sectionChange"
    ></u-subsection>
    <view class="tab-box" v-if="isPlan">
      <plan :livePlanList="livePlanList"></plan>
    </view>
    <view class="tab-box" v-else>
      <history></history>
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
    };
  },
  computed: {
    isPlan() {
      return this.current === 0;
    },
    ...mapState({
      isLogin: (state) => state.isLogin,
    }),
  },
  async onShow() {
    if (!this.isLogin) {
      this.livePlanList = [];
      return;
    }
    try {
      const { data } = await getSecretLiveList({ status: 0 });
      const currentData = data.map((v) => ({
        ...v,
        startTime: dayjs(v.startTime).format("YYYY-MM-DD HH:mm"),
        endTime: dayjs(v.endTime).format("YYYY-MM-DD HH:mm"),
      }));
      this.livePlanList = currentData;
    } catch (e) {
      //TODO handle the exception
      this.livePlanList = [];
    }
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
