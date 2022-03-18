<template>
  <view class="container">
    <image
      mode="widthFix"
      src="https://live-cdn.xgpax.top/common/edit_profile.png"
    />
    <u--form labelPosition="left" :model="formData" :rules="rules" ref="form">
      <u-form-item required label="头像" prop="avatarUrl" borderBottom>
        <u-upload name="3" :maxCount="1" :previewFullImage="true"></u-upload>
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
      <u-button type="primary" text="保存"></u-button>
    </view>
  </view>
</template>

<script>
import { convert } from "../../utils/index";

export default {
  data() {
    return {
      formData: {
        nickName: "",
        signature: "",
        avatarUrl: "",
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
