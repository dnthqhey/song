/* path */
(function ($) {
    'use strict';

    window.element = {};

    $(function () {

        var $window = $(window),
            $container = $('#container');

        $(window).on('load resize',function(){
            var cultList = document.querySelector('.p-wrap .p_table_wrap') ? document.querySelector('.p-wrap .p_table_wrap') : false;

            if(cultList){
                var theadCol = cultList.querySelectorAll('table.thead col'),
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
            }
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

        /* 프로그램 상세 이미지 슬라이드 */
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

        /* 페이징 */
        $('.p-pagination .prev_group .prev_one').text('이전');
        $('.p-pagination .next_group .next_one').text('다음');




        /* 감면혜택 자세히 보기 버튼 토글 */
        var $detailBtn = $container.find('.btn.type3.details'),
            $tablePop = $container.find('.table_popup');

        $detailBtn.on('click', function() {
            $tablePop.toggleClass('active');
        });






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

    });
})(window.jQuery);