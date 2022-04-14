<template>
  <view class="container">
    <!-- #ifdef H5 -->
    <view id="myPlayer"></view>
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <video
      ref="videoElement"
      :src="src"
      autoplay
      :controls="false"
      style="width: 100vw"
    />
    <!-- #endif -->
  </view>
</template>

<script>
import { getLiveDetail } from "@/api";
import user from "@/components/user.vue";
// #ifdef H5
import flvjs from "flv.js";
// #endif
export default {
  data() {
    return {
      src: "",
      liveId: "",
      liveUrl: null,
      detail: null,
      windowWidth: "",
      flvPlayer: null,
      player: null,
    };
  },
  components: {
    user,
  },
  methods: {
    // #ifdef H5
    generateVideoTag() {
      const player = document.createElement("video");
      player.id = "video";
      player.style = "width:100vw;height:225px;";
      player.enableProgressGesture = false;
      player.controls = true;
      player.x5VideoPlayerType = "h5-page";
      player.x5VideoPlayerFullscreen = "false";
      player.autoplay = true; // 以上均为 video标签的属性配置
      return player;
    },
    initVideo() {
      // 生成需要的video 组件
      this.player = this.generateVideoTag();
      document.getElementById("myPlayer").appendChild(this.player);
    },
    getLivePlayer() {
      if (flvjs.isSupported()) {
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true, //<====直播的话，加个这个
          url: this.src,
        });
        this.flvPlayer.attachMediaElement(this.player);
        this.flvPlayer.load(); //加载
        this.player.play();
      }
    },
    // #endif
  },
  async onLoad({ liveId }) {
    this.liveId = liveId;
    const { data: liveDetail } = await getLiveDetail({ liveId });
    const { liveUrl, detail } = liveDetail;
    this.liveUrl = liveUrl;
    this.detail = detail;
    // 根据平台获取对应的播放地址
    // #ifdef APP-PLUS || H5
    this.src = liveUrl.flv;
    const sysInfo = uni.getSystemInfoSync();
    this.windowWidth = sysInfo.screenWidth;
    // #endif
    // #ifdef MP
    this.src = liveUrl.hls;
    // #endif
    console.log(this.src);
    // #ifdef H5
    this.$nextTick(() => {
      this.initVideo();
      this.getLivePlayer();
    });
    // #endif
  },
};
</script>

<style lang="scss" scoped>
.container {
  #myPlayer {
    width: 100vw;
    height: 225px;
    background-color: #000;
  }
}
</style>
