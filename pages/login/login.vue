<template>
  <view class="container">
    <image src="https://live-cdn.xgpax.top/common/live-login.png" />
    <view class="login">
      <view class="default-title"
        ><u--input
          placeholder="邮箱"
          prefixIcon="email"
          :prefixIconStyle="prefixIconStyle"
      /></view>
      <view class="default-title"
        ><u--input
          password
          placeholder="密码 (不超过12位)"
          maxlength="12"
          prefixIcon="eye-off"
          :prefixIconStyle="prefixIconStyle"
      /></view>
      <view class="default-title" v-show="isInRegister">
        <u--input
          password
          placeholder="确认密码"
          maxlength="12"
          prefixIcon="eye-off"
          :prefixIconStyle="prefixIconStyle"
        />
      </view>
    </view>
    <view class="flex-row">
      <view class="default-title"
        ><u-button
          type="primary"
          @click="handleRegister"
          :text="buttonText[0]"
        ></u-button
      ></view>
      <view class="default-title"
        ><u-button :text="buttonText[1]" @click="handleInRegister"></u-button
      ></view>
    </view>
  </view>
</template>

<script>
import { registerUser } from "api/index.js";

const defaultButtonText = ["登录", "注册"];
const isRegisterButtonText = ["注册", "返回"];
export default {
  data() {
    return {
      prefixIconStyle: "font-size: 22px;color: #909399",
      isInRegister: false,
      buttonText: defaultButtonText,
    };
  },
  methods: {
    handleInRegister() {
      const currentStatus = this.isInRegister;
      this.isInRegister = !currentStatus;
      this.buttonText = !currentStatus
        ? isRegisterButtonText
        : defaultButtonText;
    },
    handleRegister() {
      registerUser({
        password: "123456",
        email: "1312976124@qq.com",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login {
    margin-top: 20rpx;
  }
}
</style>
