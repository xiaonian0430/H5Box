// api host，末尾不要带斜杠。
let host = 'http://112.74.58.15:8100'

// 默认分享的内容
let shareContent = '贵阳讯鸟云计算'
let shareLink = 'http://www.infobird.com/'

// 是否是调试模式。如果是生产环境，请设置为false
const debug = false

// 程序信息，置空则不显示
const info = {
	version: 'v1.0.0',
	copyright: 'infobird',
	license: 'Apache 2.0',
	author: 'Xiao Nian',
}

const api = {
	lastestVersion: `${host}/api/v1/version`,
}


module.exports = {
	api,
	debug,
	info,
	shareContent,
	shareLink,
}
