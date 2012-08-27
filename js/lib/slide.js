/**
 * @fileoverview mslide逻辑文件（实现应用控制器、slide特效）
 * @author 栋寒
 * @dependencise: 
 * @for: mobile webapp
 */

define(function(require,exports){
	/**
	 * 工具集
	 */
	var S = {
		parseSearchJson: function(){
			var _search = location.search ,
				arr = _search.replace('?','').split('&') ,
				obj = {};
			_.each(arr,function(n){
				var _a = n.split('=');
				obj[_a[0]] = _a[1];
			});
			return obj;
		},
		//获取系统平台，主要区分ios和android
		platform: function(){
			var useragent = navigator.userAgent.toLowerCase();
			if(useragent.indexOf('iphone') >= 0 || useragent.indexOf('ipad') >= 0 || useragent.indexOf('ipod') >= 0){
				return 'ios';
			}else if(useragent.indexOf('android')){
				return 'android';
			}else{
				return 'other';
			}
		},
		hasAnim: function(){
			var obj = this.parseSearchJson();
			//url 参数优先级较高
			if(obj.switchAnim == 'true'){
				return true;
			}else if(obj.switchAnim == 'false'){
				return false;
			}
			//平台检测，默认只有ios系统会自动开启slide动画
			var pf = this.platform();
			if(pf === 'ios'){
				return true;
			}else{
				return false;
			}
		},
		//设置两帧之间slide切换所需时间，单位:ms
		animTime: 300
		
		
	}; 
	//监听页面中所有超链接的点击事件
	$(document).on('click',function(e){
		var obj = e.target , _v = true;
		if(obj.tagName === 'A' && obj.getAttribute('dataRole') === 'inline'){
			e.preventDefault();
			
			var targetHash = encodeURIComponent(obj.getAttribute('href')),
				dir = obj.getAttribute('animDir');
				check = obj.getAttribute('checked');
			if(check == 'false'){
				return;
			}else{
				if(location.hash === ''){
					location.href = location.href + '#' + targetHash + '/' + dir;
				}else{
					location.href = decodeURIComponent(location.href).replace(decodeURIComponent(location.hash),'#' + targetHash + '/' + dir);
				}
			}
		}
	});
	
	/**
	 * slide启动入口(控制器)
	 * @param initTarget(string) 初始化应用界面的标识（引用页面的url或js模板的选择器--id最佳）
	 * @memberOf Slide
	 */
	exports.app = function(cfg){
		var parentWrapper = $('#s-slide'),
			wrapper = $('#s-slide .s-wrapper');
		var AppController = Backbone.Router.extend({
			routes: {
				//hash为空时，应用初始化
				'': 'init',
				':customurl/:dir': '_detail',
				//用于处理相同模板处理不同的业务逻辑，比如 #a.html/back/?lotype=ssq
				':customurl/:dir/:param': '_detail'
			},
			init: function(){
				this.hideToolbar();
				$.ajax({
					url: cfg.initUrl + '.' + cfg.extendName + '?t=' + new Date().getTime(),
					context: $('.s-custom-pannel'),
					success: function(o){
						this.html(o);
					}
				});
			},
			_detail: function(customurl,dir){
				this.hideToolbar();
				var _back = '' ,
					_forward = '',
					context = $('<section class="s-custom-pannel"><div class="s-loading"><img src="../images/l.gif" /> 正在努力加载应用...</div></section>'),
					_delayTime = 0;
				if(S.hasAnim()){
					_back = 's-anim-back' , _forward = 's-anim-forward';
					_delayTime = S.animTime;
				}else{
					_back = 's-back' , _forward = 's-forward';
				}
				
				if(dir === 'forward'){
					wrapper.append(context);
					wrapper.removeClass(_back).addClass(_forward);
				}else if(dir === 'back'){
					$('.s-custom-pannel').before(context);
					wrapper.removeClass(_forward).addClass(_back);
				}
				
						
				_.delay(function(){
					$.ajax({
						url: decodeURIComponent(customurl) + '.' + cfg.extendName + '?t=' + new Date().getTime(),
						context: context,
						success: function(o){
							var self = this;
							if(dir === 'forward'){
								$('.s-custom-pannel').eq(0).remove();
								wrapper.removeClass(_forward);
							}else if(dir === 'back'){
								$('.s-custom-pannel').eq(1).remove();
								wrapper.removeClass(_back);
							}
							self.html(o);
						}
					});
				},_delayTime);
				
				
			},
			hideToolbar: function(){
				parentWrapper.height('5000px');
				window.scrollTo(0,0);
				parentWrapper.height(window.innerHeight + 'px');
			},
			param: function(){
				var hash = location.hash,
					obj = {},
					arr = hash.split('/');
				
				if(arr.length <= 1){
					return obj;
				}else{
					var str = arr[arr.length - 1].replace('?','');
					var _arr = str.split('&');
					for(var i=0;i<_arr.length;i++){
						var a = _arr[i].split('=');
						obj[a[0]] = a[1];
					}
					return obj;
				}
			}
			
		});
		var appcontroller = new AppController;
		Backbone.history.start();	
		return appcontroller;
	};

});