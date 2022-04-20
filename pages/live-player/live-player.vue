<template>
  <view class="container">
    <!-- #ifdef H5 -->
    <view id="myPlayer"></view>
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view id="myPlayer">
      <video
        ref="videoElement"
        :src="src"
        autoplay
        :controls="false"
        style="width: 100vw"
      />
    </view>
    <!-- #endif -->
    <view class="scroll-view">
      <view class="input-container">
        <view class="input-box">
          <u--input
            class="input"
            :placeholder="placeholder"
            :disabled="!isLogin"
            prefixIcon="chat"
            v-model="barrage"
            :adjustPosition="false"
            prefixIconStyle="font-size: 22px;color: #909399"
          ></u--input>
          <u-button
            :adjust-position="false"
            class="button"
            text="发送"
            type="success"
            :disabled="!barrage"
            @click="handleSendBtnClick"
          ></u-button>
        </view>
      </view>
      <view class="scroll-container">
        <barrage-container
          v-if="liveId"
          style="max-height: 40vh"
          :liveId="liveId"
        ></barrage-container>
      </view>
    </view>
  </view>
</template>

<script>
import { getLiveDetail, sendBarrage } from "@/api";
import user from "@/components/user.vue";
import barrageContainer from "@/components/barrage-container.vue";
import { mapState } from "vuex";
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
      barrage: "",
      timer: null,
      barrageList: [],
    };
  },
  components: {
    user,
    barrageContainer,
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
    }),
    placeholder() {
      return this.isLogin ? "发条弹幕吧~" : "登录后才可以互动哦~";
    },
  },
  methods: {
    async handleSendBtnClick() {
      try {
        const data = {
          liveId: this.liveId,
          barrage: {
            type: "message",
            content: this.barrage,
          },
        };
        await sendBarrage(data);
        this.barrage = "";
      } catch (e) {
        console.error(e);
      }
    },

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
  .scroll-view {
    margin: 20px;
    .input-container {
      bottom: 10px;
      .input-box {
        width: 100%;
        display: flex;
        .button {
          flex: 0.2;
          margin-left: 4px;
        }
      }
    }
  }
  #myPlayer {
    width: 100vw;
    height: 225px;
    background-color: #000;
  }
}
</style>
