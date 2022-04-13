<template>
  <view class="container">
    <view class="content" v-if="liveList.length">
      <view class="content-item" v-for="live in liveList" :key="live.liveId">
        <current-live
          :cover="live.cover"
          :isInEdit="false"
          :liveId="live.liveId"
          :title="live.title"
          :userDetail="live.userDetail"
          :onEnterLivingRoom="onEnterLivingRoom"
        ></current-live>
      </view>
    </view>
    <view class="empty" v-else>
      <u-empty text="暂无直播内容" :icon="src"></u-empty>
    </view>
  </view>
</template>

<script>
import { getLiveList } from "../../api";
import { mapState } from "vuex";
import currentLive from "../play/components/current-live.vue";

export default {
  data() {
    return {
      src: "https://live-cdn.xgpax.top/common/no_live.png",
      liveList: [],
    };
  },
  components: {
    currentLive,
  },
  computed: {
    ...mapState({
      openId: (state) => state.openId,
    }),
  },
  methods: {
    async refreshList() {
      const result = await getLiveList();
      const { data } = result;
      this.liveList = data;
      console.log(result);
    },
    onEnterLivingRoom(liveId, openId) {
      uni.navigateTo({
        url: `/pages/live-player/live-player?liveId=${liveId}`,
      });
    },
  },
  async onShow() {
    this.refreshList();
  },
  async onPullDownRefresh() {
    await this.refreshList();
    uni.stopPullDownRefresh();
  },
};
</script>

<style lang="scss" scoped>
.container {
  .empty {
    @extend .flex-column;
    justify-content: center;
    height: 80vh;
  }
  .start-btn {
    position: fixed;
    right: $uni-spacing-row-lg;
    bottom: $uni-spacing-col-lg;
  }
  .content {
    width: 100%;
    @extend .flex-column;
  }
}
</style>
