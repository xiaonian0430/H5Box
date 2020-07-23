<script>
	import config from 'config.js'
	import util from 'utils/util.js'
	export default {
		onLaunch: function() {
			uni.hideTabBar()
			let info = uni.getSystemInfoSync()
			info.versionCode = 0
			info.version = config.info.version
			info.appVersion = config.info.version
			info.bookshelfChanged = false
			
			if (info.model && info.model.indexOf('iPhone') !== -1) {
				info.titleBarHeight = 44
			} else {
				info.titleBarHeight = 48
			}

			if (config.debug) {
				console.log(info)
				console.log('platform', info.platform)
			}
			util.setSysInfo(info)
		},
		onShow: function() {
			if (config.debug) console.log('App Show')
		},
		onHide: function() {
			if (config.debug) console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/common.css");
</style>
