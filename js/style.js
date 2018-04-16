$(function () {

    /*搜索框切换*/
    (function(){
        var oLi=$('#menu li');
        var oText=$('#search').find('.form .text');
        var oJsonp=$('#jsonp');
        var oJsLi='';
        var arrText=[
            '例如：使用jsonp跨域热搜',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var num = 0;
        oText.val(arrText [num]);
        oText.attr('value',arrText[num]);
        oLi.each(function (index) {
            $(this).click(function () {
                oLi.attr('class','gradient').eq(index).attr('class','active');
                num=index;
                oText.val(arrText [num]);
            });
        });
        oText.focus(function () {
            if($(this).val()==arrText[num]){
                $(this).val('');
            }
            oJsonp.show();
        });
        oText.blur(function () {
            if($(this).val()==''){
                $(this).val(arrText [num]);
            }
            oJsonp.hide();
        });
        oText.keyup(function () {
            oJsonp.empty();
            oJsLi='';
            $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?", {wd:oText.val()},function(json){
                   for(i=0;i<json.s.length;i++){
                        $("<li>"+json.s[i]+"</li>").appendTo(oJsonp);
                   }
                   console.log(oJsonp.find('li'));

                oJsonp.find('li').mousedown(function () {
                    oText.val($(this).html());
                    oJsonp.hide();
                });
            });
        });
    })();


    /*新闻滚动条*/
    (function () {
        var upDate=$('#search .update');
        var upUl=upDate.find('ul');
        var upBtn=$('#updateUpBtn');
        var downBtn=$('#updateDownBtn');
        var count=0;
        var timer=null;
        var news=[
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.baidu.com' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.baidu.com' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.baidu.com' }
        ];
        var str='';
        for(var i=0;i<news.length;i++){
            str+="<li><a href="+news[i].url+"><strong>"+news[i].name+"</strong> <span>"+news[i].time+"分钟前 </span>写了一篇新文章："+news[i].title+"…</a></li>";
        }
        upUl.html(str) ;
        var iH=upUl.find('li').height();
        upBtn.click(function () {
            move(-1);
        });
        downBtn.click(function () {
            move(1);
        });
        upDate.hover(function () {
            clearInterval(timer);
        },player);

        function player() {
            timer=setInterval(function () {
                move (1);
            },3500);
        }
        player();
        function move (num) {
             count+=num;
            if(count<0){
                count=(news.length-1);
            }else{
                count%=(news.length);
            }
           upUl.stop().animate({'top': -iH*count },2200,'elasticOut');
         }
    })();


    /*切换选项卡*/
    (function () {
        select($('.tabNav1'),$('.tabCon1'),'click');
        select($('.tabNav2'),$('.tabCon2'),'click');
        select($('.tabNav3'),$('.tabCon3'),'mouseover');
        select($('.tabNav4'),$('.tabCon4'),'mouseover');


        function select(nav,list,ev ) {
            var cld=nav.children();
            list.hide().eq(0).show();
            cld.each(function (index) {
                $(this).on(ev,function () {
                    cld.removeClass('active').addClass('gradient').eq(index).removeClass('gradient').addClass('active');
                    list.hide().eq(index).show();
                    cld.find('a').removeClass('triangle_down_red').addClass('triangle_down_gray').eq(index).removeClass('triangle_down_gray').addClass('triangle_down_red');
                })
            })
        }

    })();
    /*轮播图*/
    (function () {


        var oFade=$('#fade');
        var oLi1=oFade.find('ul li');
        var oLi2=oFade.find('ol li');
        var oTitle=oFade.find('p');
        var num=0;
        var title=[
            '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方'
        ];

        scroll();
        var timer=setInterval(scroll,3000);
        function scroll() {
            oLi1.fadeOut().eq(num).fadeIn();
            oLi2.attr('class','').eq(num).attr('class','active');
            oTitle.html(title[num]);
            num++;
            num%=oLi1.length;
        }

        oLi2.click(function () {
            num =$(this).index();
            scroll();
        });
        oFade.hover(function () {
            clearInterval(timer);
        },function () {
            timer=setInterval(scroll,3000);
        });

    })();
    /*日历提醒*/

    /*BBS*/
    (function () {
        var oBBS=$('.bbs');
        var oLi=oBBS.find('li');
        oLi.mouseover(function () {
            oLi.attr('class','').eq($(this).index()).attr('class','active');
        });
    })();
    /*红人烧客*/
    (function () {
        var oLi=$('.hot_area li');
        var data=['',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];
        oLi.mouseover(function () {
            if($(this).index()==0){return ;}
            oLi.find('p').remove();
            $(this).append('<p style=width:'+($(this).width()-12)+'px;height: '+($(this).height()-12)+'px>'+data[$(this).index()]+'</p>');
        })

    })();


});