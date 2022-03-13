<template>
	<view class="avatar">
		<image :src="src" :style="[avatarStyle]" mode="widthFix"></image>
	</view>
</template>

<script>
	
	export default {
		props:{
			src: {
				type: String
			},
			size: {
				type: Number,
				default: 80
			}
		},
		computed:{
			avatarStyle(){
				return {
					width: this.size + 'rpx',
					height: this.size + 'rpx'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.avatar{
		border-radius: 50%;
		display: inline-flex;
		background-color: $color-avatar-default;
		overflow: hidden;
		margin: $padding-size-base;
	}
</style>
