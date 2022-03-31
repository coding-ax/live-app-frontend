<template>
  <view class="container">
    <image src="https://live-cdn.xgpax.top/common/live-login.png" />
    <view class="login">
      <u--form ref="login" :rules="rules" :model="formData">
        <u-form-item prop="email"
          ><u--input
            v-model="formData.email"
            placeholder="邮箱"
            prefixIcon="email"
            :prefixIconStyle="prefixIconStyle"
        /></u-form-item>
        <u-form-item prop="password">
          <u--input
            v-model="formData.password"
            password
            placeholder="密码 (6-16位)"
            maxlength="16"
            prefixIcon="eye-off"
            :prefixIconStyle="prefixIconStyle"
          />
        </u-form-item>
        <u-form-item prop="verifyPassword" v-if="isInRegister">
          <u--input
            v-model="formData.verifyPassword"
            password
            placeholder="确认密码"
            maxlength="16"
            prefixIcon="eye-off"
            :prefixIconStyle="prefixIconStyle"
          />
        </u-form-item>
      </u--form>
    </view>
    <view class="flex-row">
      <view class="default-title"
        ><u-button
          :loading="btnLoading"
          type="primary"
          @click="handleConfirmBtnClick"
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
import { registerUser, loginUser } from "api/index.js";
import md5 from "md5";

const defaultButtonText = ["登录", "注册"];
const isRegisterButtonText = ["注册", "返回"];
export default {
  data() {
    return {
      prefixIconStyle: "font-size: 22px;color: #909399",
      isInRegister: false,
      buttonText: defaultButtonText,
      btnLoading: false,
      formData: {
        email: "1312976124@qq.com",
        password: "123456",
        verifyPassword: "123456",
      },
      rules: {
        email: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
          {
            min: 6,
            max: 16,
            message: "密码不超过16位，不低于6位",
          },
        ],
        verifyPassword: [
          {
            required: true,
            message: "请确认密码",
            trigger: ["blur", "change"],
          },
        ],
      },
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
    async login() {
      await this.$refs.login.validate();
      const { email, password } = this.formData;
      this.btnLoading = true;
      try {
        const loginRes = await loginUser({
          email,
          password: md5(password),
        });
        const { detail } = loginRes.data;
        // 提交到 vuex
        this.$store.commit("setUserInfo", detail);
        // 返回上级页面
        uni.navigateBack();
      } finally {
        this.btnLoading = false;
      }
    },
    async register() {
      await this.$refs.login.validate();
      const { email, password, verifyPassword } = this.formData;
      if (verifyPassword !== password) {
        uni.showToast({
          title: "验证密码和密码不一致",
          icon: "none",
        });
        return;
      }
      try {
        this.btnLoading = true;
        await registerUser({
          password: md5(password),
          email,
        });
        uni.showToast({
          title: "认证邮件已发送，请点击邮件附带链接确认注册",
          icon: "none",
        });
      } finally {
        this.btnLoading = false;
      }
    },
    async handleConfirmBtnClick() {
      this.isInRegister ? await this.register() : await this.login();
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
