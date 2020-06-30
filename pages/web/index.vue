<template>
    <view>
		<iheader :showIcon="true" v-if="showIheader" :pagesLen="pagesLen" :title="title"></iheader>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
	import iheader from '../../components/header.vue'
	import util from '../../utils/util.js'
    export default {
		components: {
			iheader
		},
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#00aaff'
                    }
                },
				pagesLen: 1,
				showIheader: false,
				title: '',
				url: 'http://www.infobird.com/mb/'
            }
        },
		onReady(){
			var that = this
			// #ifdef APP-PLUS
			that.showIheader=true
			var currentWebview = that.$scope.$getAppWebview()
			//此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			setTimeout(function() {
				var sysInfo = util.getSysInfo()
				var statusBarHeight = sysInfo.statusBarHeight
				var titleBarHeight = sysInfo.titleBarHeight
				var windowHeight = sysInfo.windowHeight
				var top = statusBarHeight + titleBarHeight
				var height = windowHeight - top
				
				var wv = currentWebview.children()[0]
				wv.setStyle({top:top,height:height})
				
				wv.addEventListener('loaded', function(){
					var url = wv.getURL()
					if(url == that.url){
						that.pagesLen = 1
					}else{
						that.pagesLen = 0
					}
					that.title = wv.getTitle()
				}, false);
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		onBackPress(options) {
			// #ifdef APP-PLUS
			var currentWebview = this.$scope.$getAppWebview()
			var wv = currentWebview.children()[0]
			var url = wv.getURL()
			if(url != this.url){
				wv.back()
				return true
			}else{
				return false
			}
			// #endif
		}
    }
</script>

<style>

</style>