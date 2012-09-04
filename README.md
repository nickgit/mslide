# mSlide概述
mSlide是一款基于seajs、zepto、backbone的动画插件，在传统多页面开发模式基础上，为移动端webapp应用界面切换提供动画解决方案。

## 使用条件

- 已厌倦了传统的多页面跳转的交互体验
- 向往给用户提供更加优雅的展现方式
- 想利用OPAP解决以上问题，却苦于开发任务难以分割
- 期望你开发的移动端WEB应用，够轻、够快、够强大
假设依次满足上述条件，那么你真的很适合用这款动画插件

## 工作原理
mSlide根据基础的路由配置，控制应用界面资源的加载，并可利用seajs天然沙箱隔离子业务逻辑。<br>
**配置如下：**<br>
![代码示例](http://img01.taobaocdn.com/tps/i1/T1YMPJXdFjXXaVsw6A-575-147.png)<br>
**注：**mslide的路由配置不提供扩展选项，并且最多支持三级查询，比如http://domain/app.html#path/direction/s3/s4将不会执行任何回调。

## 插件特点
- 自动检测系统平台，为android平台做优雅降级处理
- 利用seajs提供的模块加载机制，更好的逻辑解耦
- backbone的天然路由，完美解决浏览器的前进、后退问题，保证应用交互的完整性
- 只提供实现动画的基本DOM包裹器及开发规范（见下），定制性强
- 可快速把多页面项目打包成单页面应用，便于团队协作和工程维护

## 使用指南
1，引入资源文件<br>
![代码示例](http://img02.taobaocdn.com/tps/i2/T1W4rKXfdbXXXGSw3n-582-78.png)<br>

2，书写必要html结构，即动画包裹器<br>
![代码示例](http://img02.taobaocdn.com/tps/i2/T1Yp2FXd0qXXc56QHS-827-221.png)<br>

3，加载动画逻辑<br>
![代码示例](http://img03.taobaocdn.com/tps/i3/T1RQPJXnRhXXaoBRrI-370-172.png)<br>


## 使用文档
### 一，超链接 书写约定
使用mSlide组织代码，业务页面中超链接书写需要遵循一些简单的规则。

#### 1，添加自定义属性
![代码示例](http://img02.taobaocdn.com/tps/i2/T1.dTKXc0eXXX4DUMP-761-30.png)<br>
自定义属性说明：<br>
##### dataRole：
是否通过内联的方式加载页面 ，只支持inline，在缺省情况下，将按照传统方式跳转URL

##### href:
异步加载页面的地址（无须带文件扩展名）。<br>
相对路径、绝对路径均可，不支持跨域。使用相对路径时，目录是相对于mslide启动页，而不是相对于业务页面。<br>
比如以下结构：![代码示例](http://img04.taobaocdn.com/tps/i4/T14InKXb0fXXbnVmMT-336-168.png)<br>
slide.html作为壳启动页面，a、b、c、d均为业务页面。 当在d页面时，需要加载b，href正确的写法为：<br>
href="b"<br>
而不是<br>
href="demo/b"<br>
##### animDir:
页面推送方向，可选值为forward、back。<br>
需要注意的是，forward、back不仅仅代表向前滑动、向后滑动，也有可能渐隐、渐现。</br>
动画效果的选择，需要在程序初始化时配置。

##### checked:
默认值true,
此属性使用在应用程序中的“下一步”、“完成”场景，需要在跳转前检测表单合法性、数据可用性等，只需将此属性值设置为false即可阻止程序执行。

#### 2，另辟蹊径
自定义属性不是必须的，更加直接有效的做法是：<br>
![代码示例](http://img03.taobaocdn.com/tps/i3/T1A4vJXeNlXXXkfubZ-440-33.png)<br>
这种写法会遇到一个棘手的问题，即目标URL中包含'/'时，需要使用URL编码，解码工作在加载页面时由mSlide系统自动完成。例如：<br>
![代码示例](http://img02.taobaocdn.com/tps/i2/T1bijKXe8dXXXyoxHU-423-32.png)
此时将无法获取b页面地址，系统获取的customUrl为'..'而不是'../b'，正确的做法是将'../b'做URL编码，即href=”#..%2Fb/forward”。<br>
**结论：**两种写法各有利弊，需要根据不同的应用场景，灵活选择！<br>





