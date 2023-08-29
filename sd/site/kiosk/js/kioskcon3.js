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
            $verticalSpeed = 7000; //세로팝업 속도 ms
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
            $topSpeed = 5000; //가로팝업 상단 속도 ms


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

        });


    });
})(window.jQuery);