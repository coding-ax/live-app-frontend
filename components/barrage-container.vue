<template>
  <scroll-view
    scroll-y="true"
    :scroll-top="scrollTop"
    scroll-with-animation="true"
    class="container"
  >
    <view class="barrage" v-for="barrage in barrageList" :key="barrage.id">
      <barrage :barrage="barrage"></barrage>
    </view>
  </scroll-view>
</template>

<script>
import barrage from "./barrage.vue";
import dayjs from "dayjs";
import { getBarrage } from "@/api";

const delayTime = 2000;
const timeSleep = 1000;

export default {
  props: {
    liveId: {
      type: String,
      default: "",
    },
  },
  components: {
    barrage,
  },
  data() {
    return {
      scrollTop: 99999,
      barrageList: [],
      timer: null,
    };
  },
  methods: {
    clearRealtimeChat() {
      clearInterval(this.timer);
    },
    scrollToBtn() {
      this.scrollTop += 200;
      this.scrollTop %= Number.MAX_SAFE_INTEGER;
    },
    async getRealtimeBarrage() {
      try {
        const startTime = dayjs()
          .subtract(delayTime, "millisecond")
          .format("YYYY-MM-DD HH:mm:ss");
        const res = await getBarrage({
          startTime,
          // endTime,
          liveId: this.liveId,
        });
        if (res.data.length) {
          this.barrageList.push(...res.data);
          this.scrollToBtn();
        }
      } catch (e) {
        //TODO handle the exception
        console.error(e);
      }
    },
    initRealtimeChat() {
      this.clearRealtimeChat();
      this.timer = setInterval(() => {
        this.getRealtimeBarrage();
      }, timeSleep);
    },
  },
  mounted() {
    this.initRealtimeChat();
  },
  beforeDestroy() {
    this.clearRealtimeChat();
  },
};
</script>

<style>
.container {
  min-height: 200px;
  max-height: 300px;
  overflow-y: scroll;
}
</style>
