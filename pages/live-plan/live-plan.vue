<template>
  <view class="container">
    <image :src="src"></image>
    <view class="form">
      <u--form
        labelPosition="left"
        :model="model"
        :rules="rules"
        ref="createLivePlanForm"
      >
        <u-form-item prop="title" label="标题" required borderBottom>
          <u--input
            v-model="model.title"
            border="none"
            placeholder="请输入直播间标题"
          ></u--input>
        </u-form-item>
        <u-form-item prop="cover" label="封面" required borderBottom>
          <u-upload
            :maxCount="1"
            :previewFullImage="true"
            @delete="deletePic"
            @afterRead="afterRead"
            :fileList="model.cover"
            width="290"
            height="160"
          ></u-upload>
        </u-form-item>
        <u-form-item
          prop="startTime"
          label="直播开始时间"
          required
          labelWidth="100"
          borderBottom
        >
          <u-button
            v-if="!model.startTime"
            @click="handleTimeSelectorChange(true, true)"
            >点击选择</u-button
          >
          <view v-else class="time-trigger">
            <view>{{ model.startTime }}</view>
            <u-icon
              @click="handleClearIconClick(true)"
              name="close-circle-fill"
              color="red"
              size="28"
            ></u-icon>
          </view>
        </u-form-item>
        <u-form-item
          prop="endTime"
          label="预计结束时间"
          required
          labelWidth="100"
          borderBottom
        >
          <u-button
            @click="handleTimeSelectorChange(true, false)"
            v-if="!model.endTime"
          >
            点击选择</u-button
          >
          <view v-else class="time-trigger">
            <view>{{ model.endTime }}</view>
            <u-icon
              @click="handleClearIconClick(false)"
              name="close-circle-fill"
              color="red"
              size="28"
            ></u-icon>
          </view>
        </u-form-item>
      </u--form>
    </view>
    <view class="submit">
      <u-button
        type="primary"
        :loading="btnLoading"
        @click="handleSubmit"
        text="创建"
      ></u-button>
    </view>
    <u-datetime-picker
      :show="timeSelectorShow"
      @confirm="handleTimeChange"
      mode="datetime"
      @cancel="handleTimeSelectorChange(false)"
      :minDate="startTimeLimit"
      :maxDate="endTimeLimit"
    ></u-datetime-picker>
  </view>
</template>

<script>
import dayjs from "dayjs";
import { editLive, file2qiniuCloud } from "../../api";
import { cloneDeep } from "lodash";
export default {
  data() {
    return {
      src: "https://live-cdn.xgpax.top/common/write_edit.png",
      timeSelectorShow: false,
      isChooseStartTime: false,
      btnLoading: false,
      model: {
        title: "",
        cover: [],
        startTime: "",
        endTime: "",
      },
      rules: {
        title: {
          require: true,
          message: "请输入直播间标题",
          trigger: ["blur", "change"],
        },
        cover: {
          type: "array",
          required: true,
          message: "请上传封面",
          trigger: ["change"],
        },
        startTime: {
          required: true,
          message: "请选择直播开始时间",
          trigger: ["blur", "change"],
        },
        endTime: {
          required: true,
          message: "请选择预计结束时间",
          trigger: ["blur", "change"],
        },
      },
    };
  },
  computed: {
    currentTime() {
      return dayjs();
    },
    startTimeLimit() {
      return this.model.startTime
        ? dayjs(this.model.startTime).add(1, "h").valueOf()
        : this.currentTime.valueOf();
    },
    //如果有选择了开始时间，则限制结束时间不能早于开始时间一个小时如果没有选择开始时间，则限制结柬时间要被限制在一个月内
    endTimeLimit() {
      //如果选择了结束时间,说明选择的是开始时间，那么取结束时间的前一个小时作为结束时间限制
      if (this.model.endTime) {
        return Math.max(
          dayjs(this.model.endTime).subtract(1, "h").valueOf(),
          this.currentTime.valueOf()
        );
      }

      return this.model.startTime
        ? dayjs(this.model.startTime).add(1, "d").valueOf()
        : this.currentTime.add(1, "month").valueOf();
    },
  },
  methods: {
    handleTimeSelectorChange(status, isStartClick) {
      typeof isStartClick !== "undefined" &&
        (this.isChooseStartTime = isStartClick);
      this.timeSelectorShow = status;
    },
    handleClearIconClick(isStartIcon) {
      isStartIcon ? (this.model.startTime = "") : (this.model.endTime = "");
    },
    handleTimeChange(event) {
      const { value } = event;
      const timeToken = "YYYY-MM-DD HH:mm:ss";
      this.isChooseStartTime
        ? (this.model.startTime = dayjs(value).format(timeToken))
        : (this.model.endTime = dayjs(value).format(timeToken));
      this.handleTimeSelectorChange(false);
    },
    deletePic(event) {
      this.model.cover.splice(event.index, 1);
    },
    async afterRead(event) {
      const { file } = event;
      // 上传文件到七牛云
      const targetUrl = await file2qiniuCloud(file);
      // 更新头像
      this.model.cover = [
        {
          url: targetUrl,
        },
      ];
    },
    async handleSubmit() {
      try {
        await this.$refs.createLivePlanForm.validate();
        this.btnLoading = true;
        console.log(this.model);
        const cloneModel = cloneDeep(this.model);
        cloneModel.cover = cloneModel.cover[0].url;
        await editLive(cloneModel);
        uni.showToast({
          title: "创建成功",
        });
        setTimeout(() => {
          uni.switchTab({
            url: "/pages/play/play",
          });
        }, 2000);
      } finally {
        this.btnLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @extend .flex-column;
  padding: 40rpx;
  width: 100vw;
  box-sizing: border-box;
  .form {
    width: 100%;
    margin-top: 20rpx;
    .time-trigger {
      @extend .flex-row;
      justify-content: space-between;
      height: 40px;
    }
  }
  image {
    width: 280px;
    height: 150px;
  }
  .submit {
    margin-top: 20rpx;
  }
}
</style>
