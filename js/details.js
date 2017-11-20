//初始化绑定isscroll控件
    /*document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    },false);*/
   function  pullUpAction(){
   	 //myScroll.refresh();
   }
   function pullDownAction(){
   	 var el, li, i;
//    el = document.getElementById('thelist');
//      for (var i=0;i<6;i++) {
//	       li = document.createElement('li');
//	       li.innerHTML = '<div class="recordImg"><img src="img/header.png"/></div><div class="recordInfo"><p>爱丽丝</p><p>2017-03-02 <span>15:16</span></p></div><div class="recordM"><p><span>5.20</span>元</p></div>';
//	       el.insertBefore(li, el.childNodes[0])
//         }
 el = $('#thelist');
          for (var i=0;i<3;i++) {
          	if(i<2){
          	           	el.append('<li><div class="recordImg"><img src="img/header.png"/></div><div class="recordInfo"><p>爱丽丝</p><p>2017-03-02 <span>15:16</span></p></div><div class="recordM"><p><span>5.20</span>元</p></div></li>')
	
          	}else{
          		        el.append('<li><div class="recordImg"><img src="img/header.png"/></div><div class="recordInfo"><p>爱丽丝</p><p>2017-03-02 <span>15:16</span></p></div><div class="recordM"><p><span>10</span>元</p></div></li>')

          	}
          }
 
         myScroll.refresh();             
   }
  
    document.addEventListener('DOMContentLoaded',loaded,false);
    function loaded(){
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;
        
        /**

         * 初始化iscroll控件
         */
       myScroll = new iScroll('thelist-wrap',{
            vScrollbar: false,
            topOffset : pullDownOffset,
            onRefresh : function () {
             if(pullDownEl.className.match('loading')){
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                }else if(pullUpEl.className.match('loading')){
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }
            },
            onScrollMove: function () {
                $(".skill-ftw-menu").slideUp();
                $(".header-func").slideUp();
                if(this.y > 5 && !pullDownEl.className.match('flip')){
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '上拉加载更多...';
                    this.minScrollY = 0;
                }else if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')){
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }
            },
            onScrollEnd: function () {
                if(pullDownEl.className.match('flip')){
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';                 
                      myScroll.refresh();
                      $(".main").animate({scrollTop:0},100);
                      //$('.main')[0].scrollTop=0
                }else if(pullUpEl.className.match('flip')){
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                  
                    pullUpAction();
                    myScroll.refresh();  
                    pullDownAction()
                }
            }
        });
    }