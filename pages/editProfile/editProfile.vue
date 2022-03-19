<template>
  <view class="container">
    <image
      mode="widthFix"
      src="https://live-cdn.xgpax.top/common/edit_profile.png"
    />
    <u--form labelPosition="left" :model="formData" :rules="rules" ref="form">
      <u-form-item required label="头像" prop="avatarUrl" borderBottom>
        <u-upload
          name="1"
          :maxCount="1"
          :previewFullImage="true"
          :fileList="formData.avatarUrl"
          @delete="deletePic"
          @afterRead="afterRead"
        ></u-upload>
      </u-form-item>
      <u-form-item required label="昵称" prop="nickName" borderBottom>
        <u--input
          v-model="formData.nickName"
          placeholder="请设置昵称"
          border="none"
        ></u--input>
      </u-form-item>
      <u-form-item required label="签名" prop="signature" borderBottom>
        <u--input
          v-model="formData.signature"
          placeholder="说点什么吧~"
          border="none"
        ></u--input>
      </u-form-item>
    </u--form>
    <view class="default-title">
      <u-button
        type="primary"
        :loading="btnLoading"
        @click="handleSubmit"
        text="保存"
      ></u-button>
    </view>
  </view>
</template>

<script>
import { defaultAvatarUrl } from "../../config";
import { convert } from "../../utils/index";
import { updateProfile, file2qiniuCloud } from "../../api";
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      btnLoading: false,
      formData: {
        nickName: "",
        signature: "",
        avatarUrl: [],
      },
      rules: {
        nickName: {
          required: true,
          message: "请输入昵称",
          trigger: ["blur", "change"],
        },
        signature: {
          required: true,
          message: "请输入个性签名",
          trigger: ["blur", "change"],
        },
      },
    };
  },
  mounted() {
    // 初始化表单数据
    const currentUserInfo = convert(uni.getStorageSync("userInfo"));
    this.formData.nickName = currentUserInfo.nickName;
    this.formData.signature = currentUserInfo.signature;
    this.formData.avatarUrl = [
      {
        url: currentUserInfo.avatarUrl,
      },
    ];
  },
  methods: {
    deletePic(event) {
      this.formData.avatarUrl.splice(event.index, 1);
    },
    async afterRead(event) {
      const { file } = event;
      // 上传文件到七牛云
      const targetUrl = await file2qiniuCloud(file);
      // 更新头像
      this.formData.avatarUrl = [
        {
          url: targetUrl,
        },
      ];
    },
    async handleSubmit() {
      // 提交表单
      await this.$refs.form.validate();
      // 处理 userDetail
      const userDetail = cloneDeep(this.formData);
      userDetail.avatarUrl = userDetail.avatarUrl?.[0]?.url || defaultAvatarUrl;
      this.btnLoading = true;
      try {
        const res = await updateProfile(userDetail);
        // 更新本地缓存
        this.$store.commit("setUserInfo", res.data);
        uni.showToast({
          title: "保存成功",
        });
        // 1s后跳转到个人中心
        setTimeout(function () {
          uni.navigateBack();
        }, 1000);
      } finally {
        this.btnLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
