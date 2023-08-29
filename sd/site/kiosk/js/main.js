(function ($) {
    'use strict';

    $(function () {
        $(document).ready(function(){
        //세로 팝업
        var $vertical = $('.kiosk_vertical'),
            $verticalSlide = $vertical.find('.slide_list'),
            $verticalSlideItem = $verticalSlide.find('.slide_item'),
            $verticalPaging = $vertical.find('.pagingInfo'),
            $verticalCurrent = $verticalPaging.find('.current'),
            $verticalTotal = $verticalPaging.find('.total'),
            $verticalPrograss = $vertical.find('.slide_prograssBar'),
            $verticalSpeed = 9000; //세로팝업 속도 ms
        $verticalSlide.slick({
            arrows       : false,
            autoplay     : true,
            autoplaySpeed: $verticalSpeed
        });
        //슬릭 개수
        $verticalTotal.text($verticalSlideItem.length);
        $verticalPrograss.css('animation-duration', $verticalSpeed + 'ms');
        $verticalPrograss.addClass('active');
        $verticalSlide.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $verticalCurrent.text(i);
            $verticalTotal.text(slick.slideCount);
            $(this).siblings('.slide_prograssBar').addClass('active');
        });
        $verticalSlide.on('beforeChange', function () {
            $(this).siblings('.slide_prograssBar').removeClass('active');
        });

        /* ---------------------------- */

        //가로 팝업 상단
        var $kioskTop = $('.kiosk_top'),
            $topSlide = $kioskTop.find('.slide_list'),
            $topItem = $topSlide.find('.slide_item'),
            $topPaging = $kioskTop.find('.pagingInfo'),
            $topCurrent = $topPaging.find('.current'),
            $topTotal = $topPaging.find('.total'),
            $topPrograss = $kioskTop.find('.slide_prograssBar'),
            $topSpeed = 9000; //가로팝업 상단 속도 ms


        $topSlide.slick({
            arrows       : false,
            autoplay     : true,
            autoplaySpeed: $topSpeed
        });
        $topTotal.text($topItem.length);
        $topPrograss.css('animation-duration', $topSpeed + 'ms');
        $topPrograss.addClass('active');
        $topSlide.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $topCurrent.text(i);
            $topTotal.text(slick.slideCount);
            $(this).siblings('.slide_prograssBar').addClass('active');
        });
        $topSlide.on('beforeChange', function () {
            $(this).siblings('.slide_prograssBar').removeClass('active');
        });

        //가로 팝업 하단 우측
        var $kioskBottom = $('.kiosk_bottom'),
            $bottomLeftSlide = $kioskBottom.find('.bottom_left .slide_list'),
            $bottomRight = $kioskBottom.find('.bottom_right'),
            $bottomRightSlide = $bottomRight.find('.slide_list'),
            $rightSlideItem = $bottomRightSlide.find('.visualpopup_item'),
            $rightPagingInfo = $bottomRight.find('.pagingInfo'),
            $rightCurrent = $rightPagingInfo.find('.current'),
            $rightTotal = $rightPagingInfo.find('.total'),
            $rightPrograss = $bottomRight.find('.slide_prograssBar'),
            $rightSpeed = 9000; //가로팝업 하단 우측 속도 ms

        $bottomRightSlide.slick({
            arrows       : false,
            autoplay     : true,
            rtl          : true,
            autoplaySpeed: $rightSpeed
        });
        $rightTotal.text($rightSlideItem.length);
        $rightPrograss.css('animation-duration', $rightSpeed + 'ms');
        $rightPrograss.addClass('active');
        $bottomRightSlide.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $rightCurrent.text(i);
            $rightTotal.text(slick.slideCount);
            $(this).siblings('.slide_prograssBar').addClass('active');
        });
        $bottomRightSlide.on('beforeChange', function () {
            $(this).siblings('.slide_prograssBar').removeClass('active');
        });

        $bottomLeftSlide.slick({
            arrows        : false,
            infinite      : true,
            slidesPerRow  : 2,
            rows          : 1,
            slidesToShow  : 6,
            slidesToScroll: 1,
            dots          : false,
            autoplay      : true,
            vertical      : true,
            autoplaySpeed : 2000
        });
        });

        /* kiosk3 */
        var $kiosk3 = $('.kiosk3'),
            $festivalInfo = $kiosk3.find('.festival_info'),
            $infoTable = $festivalInfo.find('table tbody'),
            $noDate = $infoTable.find('.no_date');

        var infoLength = $infoTable.find('tr').length;
        if (infoLength < 2){
            $noDate.show();
        }else{
            $noDate.hide();
        }

    });
})(window.jQuery);