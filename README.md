# mSlide概述
mSlide是一款基于seajs、zepto、backbone的动画插件，在传统多页面开发模式基础上，为移动端webapp应用界面切换提供动画解决方案。

## 使用条件

- 已厌倦了传统的多页面跳转的交互体验
- 向往给用户提供更加优雅的展现方式
- 想利用OPAP解决以上问题，却苦于开发任务难以分割
- 期望你开发的移动端WEB应用，够轻、够快、够强大
假设依次满足上述条件，那么你真的很适合用这款动画插件

## 工作原理
mSlide根据基础的路由配置，控制应用界面资源的加载，并可利用seajs天然沙箱隔离子业务逻辑。
**配置如下：**
'routes: {
	//hash为空时，应用初始化
	'': 'init', 
	':customurl/:dir': '_detail',
	//用于处理相同模板处理不同的业务逻辑，比如 #a.html/back/?lotype=ssq
	':customurl/:dir/:param': '_detail' 
}'
*注：*mslide的路由配置不提供扩展选项，并且最多支持三级查询，比如http://domain/app.html#path/direction/s3/s4将不会执行任何回调。

## 插件特点
- 自动检测系统平台，为android平台做优雅降级处理
- 利用seajs提供的模块加载机制，更好的逻辑解耦
- backbone的天然路由，完美解决浏览器的前进、后退问题，保证应用交互的完整性
- 只提供实现动画的基本DOM包裹器及开发规范（见下），定制性强
- 可快速把多页面项目打包成单页面应用，便于团队协作和工程维护

## 使用指南
1,引入资源文件
'
<link href="http://b.ued.taobao.net/a.tbcdn.cn/apps/lottery/mslide/css/slide.css" type="text/css" rel="stylesheet" />
<script src="http://b.ued.taobao.net/a.tbcdn.cn/apps/lottery/mslide/js/lib/sea.js"></script>
<script src="http://b.ued.taobao.net/a.tbcdn.cn/apps/lottery/mslide/js/lib/zepto.js"></script>
<script src="http://b.ued.taobao.net/a.tbcdn.cn/apps/lottery/mslide/js/lib/underscore.js"></script>
<script src="http://b.ued.taobao.net/a.tbcdn.cn/apps/lottery/mslide/js/lib/backbone.js"></script>
'

