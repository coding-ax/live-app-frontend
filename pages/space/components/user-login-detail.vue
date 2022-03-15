<template>
	<view class="container">
		<Avatar :src="src" />
		<view class="flex-kid">
			<view>
				<text class="title">{{ username }}</text>
			</view>
			<view>
				<text class="sub-title">{{ signature }}</text>
			</view>
		</view>
		<view v-if="!isLogin"><button @click="handleLogin" type="primary" size="mini">立即登录</button></view>
	</view>
</template>

<script>
import Avatar from 'components/avatar.vue';
import { defaultAvatarUrl } from 'config/index.js';

export default {
	data() {
		return {
			isLogin: false,
			signature: '这个人很懒，没有留下签名',
			src: defaultAvatarUrl
		};
	},
	methods: {
		handleLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		}
	},
	components: {
		Avatar
	},
	computed: {
		username() {
			// 如果是登录状态，则显示用户名
			return this.isLogin ? '' : '未登录';
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	@extend .flex-row;
	justify-content: space-between;
	margin-top: $small-size;
	background-color: $uni-bg-color;
	padding: $small-size $standard-size;
}
</style>
