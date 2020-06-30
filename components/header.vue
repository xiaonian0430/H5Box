<template>
	<view :style="customBarStyle" v-if="showCustomBar">
		<view :class="['header', showBorder ? 'header-border' : '' ]" :style="customBarStyle">
			<view class="row">
				<view class="col-3">
					<view v-if="showIcon" class="header-icon icon-left">
						<block v-if="currentPagesLength>pagesLen">
							<view class="back" @click="headerBack" :style="iconPadding">
								<image src="/static/images/header-back.png"></image>
							</view>
						</block>
					</view>
				</view>
				<view class="col-6">
					<view class="header-title">{{title}}</view>
				</view>
				<view class="col-3">
					<view class="header-icon icon-right">
						<view v-if="showShare" :style="iconPadding" @click="share">
							<image src="/static/images/share.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../utils/util.js'
	import config from '../config.js'
	export default {
		data() {
			return {
				currentPagesLength: 0,
				customBarStyle: '',
				iconPadding: 'padding-top:16px;padding-bottom:16px',
				lineMargin: 'margin-top: 16px;',
				titleBarHeight: 44,
				showShare: false,
				showCustomBar: false
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			showIcon: {
				type: Boolean,
				default: true,
			},
			showBorder: {
				type: Boolean,
				default: false,
			},
			pagesLen: {
				type: Number,
				default: 1,
			}
		},
		created() {
			var that = this
			// #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU || MP-TOUTIAO  || H5 || APP-PLUS
			that.showCustomBar = true
			
			// 自定义NavBar
			var sysInfo = util.getSysInfo()
			var statusBarHeight = sysInfo.statusBarHeight
			var titleBarHeight = sysInfo.titleBarHeight
			that.currentPagesLength = getCurrentPages().length
			that.titleBarHeight = titleBarHeight
			
			that.customBarStyle =
				`height: ${titleBarHeight}px;line-height: ${titleBarHeight}px;padding-top: ${statusBarHeight}px`
			
			var top = (titleBarHeight - 16 - 2) / 2
			var bottom = titleBarHeight - 16 - top
			that.iconPadding = `padding-top: ${top}px;padding-bottom: ${bottom}px;`
			that.lineMargin = `margin-top: ${top}px`
			// #endif
			
			// #ifdef MP-ALIPAY
			that.showCustomBar = false
			// #endif
			
			// #ifdef APP-PLUS
			that.showShare = true
			// #endif
		},
		methods: {
			headerBack() {
				uni.navigateBack({
					delta: 1,
					fail(e) {
						wx.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			},
			headerHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			share() {
				// #ifdef APP-PLUS
				plus.share.sendWithSystem({
					content: config.shareContent,
					href: config.shareLink,
				})
				// #endif
			}
		}
	}
</script>

<style scoped>
	.header {
		top: 0;
		position: fixed;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 9999;
		vertical-align: center;
	}

	.header-border {
		border-bottom: 1upx solid #EFEFEF;
	}

	.header .header-icon {
		display: flex;
	}

	.header .icon-right {
		flex-direction: row-reverse;
		padding-right: 30upx;
	}

	.header .header-icon>view {
		height: 16px;
		padding: 0upx 16upx;
	}

	.header .header-icon .line {
		border: 0;
		width: 1upx;
		background-color: #CCCCCC;
		height: 16px;
		padding: 0;
		margin: 0 5upx 0 0upx;
	}

	.header .back {
		padding-left: 30upx;
	}

	.header image {
		width: 16px;
		height: 16px;
		display: block;
		background: transparent;
	}

	.header .header-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 30rpx;
		color: #000000;
		text-align: center;
	}
</style>
