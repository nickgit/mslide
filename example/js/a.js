define(function(require,exports){
	var S = require('./lib/iscroll');

	exports.ouput = function(){

		$('.content').html('按需异步调用a.js并处理a.html中业务逻辑');
		new S.iScroll('myscroll');
		$('.rightbar').on('click',function(e){
			var checked = $('.develop input').val();
				
			if(checked === '是'){
				this.setAttribute('checked','true');
			}else{
				alert('还没有同意进入下一步!');
				this.setAttribute('checked','false');
			}
		});
	};
});