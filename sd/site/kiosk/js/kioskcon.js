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
            $verticalSpeed = 10000; //세로팝업 속도 ms
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


        });



    });
})(window.jQuery);