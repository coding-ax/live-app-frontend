<template>
  <view class="container">
    <video ref="videoElement" :src="src" autoplay style="width: 100vw" />
  </view>
</template>

<script>
import { getLiveDetail } from "@/api";
import user from "@/components/user.vue";
export default {
  data() {
    return {
      src: "",
      liveId: "",
      liveUrl: null,
      detail: null,
    };
  },
  components: {
    user,
  },
  methods: {},
  async onLoad({ liveId }) {
    this.liveId = liveId;
    const { data: liveDetail } = await getLiveDetail({ liveId });
    const { liveUrl, detail } = liveDetail;
    this.liveUrl = liveUrl;
    this.detail = detail;
    // 根据平台获取对应的播放地址
    // #ifdef APP-PLUS
    this.src = liveUrl.flv;
    // #endif
    // #ifdef MP || H5
    this.src = liveUrl.hls;
    // #endif
    console.log(this.src);
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
