/* path */
(function ($) {
    'use strict';

    window.element = {};

    $(function () {

        var $window = $(window),
            $container = $('#container');

        $(window).on('load resize',function(){
            var cultList = document.querySelector('.p-wrap .p_table_wrap'),
                theadCol = cultList.querySelectorAll('table.thead col'),
                th = cultList.querySelectorAll('table.thead th'),
                td = cultList.querySelectorAll('table.tbody td');

            td.forEach((ele,i)=>{ /* table responsive - tbody 테이블에 th text 전달*/
                var tr = ele.parentElement.children;
                Array.from(tr).forEach((e,index)=>e.dataset.content = th[index].textContent);
            });

            theadCol.forEach((ele, i)=>{ /* list 테이블 정렬 */
                var bodyCol = cultList.querySelectorAll('table.tbody col')[i],
                    colWidth = ele.getBoundingClientRect().width;
                if(window.innerWidth > 765){
                    bodyCol.style.width = colWidth+'px';
                }else{
                    bodyCol.removeAttribute('style');
                }
            });
        });

        $('.path li.list .path_btn').on('click', function() {
            var $this = $(this),
                $MyParent = $this.parent('li.list'),
                $OtherParents = $MyParent.siblings('li.list'),
                $MyLayer = $this.siblings('.layer'),
                $OtherBtn = $OtherParents.find('button'),
                $OtherLayer = $OtherParents.find('.layer'),
                IsActive = $MyParent.is('.active');
            if(!IsActive){
                $OtherParents.removeClass('active');
                $OtherBtn.attr('title', '목록열기');
                $OtherLayer.slideUp();
                $MyParent.addClass('active');
                $this.attr('title', '목록닫기');
                $MyLayer.slideDown();
            } else{
                $MyParent.removeClass('active');
                $this.attr('title', '목록열기');
                $MyLayer.slideUp();
            };
        });

        /* 아코디언 열고 닫기*/
        $('.title_wrap .accordion_btn').on('click', function() {
            var $this = $(this),
                $Title = $this.parent('.title_wrap'),
                $Item = $Title.parent('.accordion_item'),
                $Layer = $Title.siblings('.text_wrap'),
                IsActive = $Item.is('.active');

            if(!IsActive){
                $this.addClass('active');
                $Item.addClass('active');
                $Layer.slideDown();
            } else {
                $this.removeClass('active');
                $Item.removeClass('active');
                $Layer.slideUp();
            }

        });
        /* 프로그램 상세 이미지*/
        /*
        var $infoSlide = $container.find('.p-wrap calender .info_slide'),
            $infoList = $infoSlide .find('.info_list'),
            $infoItem = $infoList.find('.info_item'),
            $infoControl = $infoSlide.find('.info_control'),
            $infoCurrent = $infoSlide.find('.info_current'),
            $infoTotal =  $infoSlide.find('.info_total'),
            $infoPrev =  $infoSlide.find('.info_prev'),
            $infoNext =  $infoSlide.find('.info_next'),
            $infoSlideSlickOpt = {
                slidesToShow: 1,
                autoplay: false,
                current: $infoCurrent,
                total: $infoTotal,
                prevArrow: $infoPrev,
                nextArrow: $infoNext
            }
        $('.info_slide .info_list').slick($infoSlideSlickOpt);
        */
       
        /* 페이징 */
        $('.p-pagination .prev_group .prev_one').text('이전');
        $('.p-pagination .next_group .next_one').text('다음');

        /* 프로그램 상세 이미지*/
        var $infoSlide = $container.find('.info_slide'),
            $infoList = $infoSlide .find('.info_list'),
            $infoItem = $infoList.find('.info_item'),
            $infoControl = $infoSlide.find('.info_control'),
            $infoCurrent = $infoSlide.find('.info_current'),
            $infoTotal =  $infoSlide.find('.info_total'),
            $infoPrev =  $infoSlide.find('.info_prev'),
            $infoNext =  $infoSlide.find('.info_next'),
            $infoSlideSlickOpt = {
                slidesToShow: 1,
                autoplay: false,
                current: $infoCurrent,
                total: $infoTotal,
                prevArrow: $infoPrev,
                nextArrow: $infoNext
            }
        $('.info_slide .info_list').slick($infoSlideSlickOpt);










        /* 맨위로 */
        var $window = element.$window = $(window),
            $footer = element.$footer = $('#footer'),
            $container = $('#container'),
            $up = $container.find('.up');

        function floatingBtn() {
            var el;

            el = $('.up');

            if (el.length <= 0) {
                return;
            }

            $(window).on('scroll.up, resize.up', function () {
                var $footer = $('#footer'),
                    $up = $('.up'),
                    winScrT = $(window).scrollTop(),
                    totH = winScrT + $(window).height(),
                    footerTop = $footer.offset().top;

                //위치
                if (totH >= footerTop) {
                    $up.addClass('show');
                } else {
                    $up.removeClass('show');
                }
            });

        }

        floatingBtn();
        $window.scroll(function(){
            floatingBtn();
        });

        /* 프로그램 레이어 팝업 */
        $(document).ready(function(){
            $("#p-layerpop").hide();
            $(".program.mypage .cancel_btn").click(function(){
                $("#contents > a").blur();
                $("#mask").show();
                $("#p-layerpop").show();
                $("#p-layerpop a").focus();
                $("body").css({overflow:'hidden'}).bind('touchmove', function(e){e.preventDefault()});
                $("#footer").css('z-index','auto');
                return false;
            });
            $("#p-layerpop .close").keydown(function(e){
                if(e.shiftKey && e.keyCode == 9){ // Shift + Tab 키를 의미합니다.
                    $("#p-layerpop > a").focus();
                    $("#p-layerpop").hide();
                    $("#mask").hide();
                    $("body").css({overflow:'scroll'}).unbind('touchmove');
                    $("#footer").css('z-index','20');
                    return false;
                }
            });

            $("#p-layerpop .close").click(function(){
                $("#contents").focus();
                $("#p-layerpop").hide();
                $("#mask").hide();
                $("body").css({overflow:'scroll'}).unbind('touchmove');
                $("#footer").css('z-index','20');
            });
        });
    });
})(window.jQuery);