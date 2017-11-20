//初始化绑定isscroll控件
    /*document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    },false);*/
   function  pullUpAction(){
   	 //myScroll.refresh();
   }
   function pullDownAction(){
   	 var el, li, i;
      el = document.getElementById('thelist');
        for (var i=0;i<6;i++) {
	       li = document.createElement('li');
	       li.innerHTML = '<div class="img"><img src="img/touxiang.png"/></div><div class="info"><p >亲爱的母亲节</p><p >2017-05-10</p></div><div class="jine"><p><span>32.68</span>元</p><p><span>58</span>人打赏</p></div>';
	       el.appendChild(li);
           }
        //或者
//        el = $('#thelist');
//        for (var i=0;i<6;i++) {
//        	el.append('<li><div class="img"><img src="img/touxiang.png"/></div><div class="info"><p >亲爱的母亲节</p><p >2017-05-10</p></div><div class="jine"><p><span>32.68</span>元</p><p><span>58</span>人打赏</p></div></li>')
//        }
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
                     
                      //pullDownAction();
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