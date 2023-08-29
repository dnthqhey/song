/**
 * @author (주)한신정보기술 퍼블리셔팀 000
 * @since 2022-10-06
 */

(function ($) {
    "use strict";

    $(function () {
        var $container = $("#container");


        /*비주얼*/

        var $visual = $container.find(".visual"),
            $visualList = $visual.find('.depth_list'),
            $ShortcutBtn = $visual.find('.shortcut_list .shortcut_btn'),
            $DepthItem = $visual.find('.depth_list .depth_item'),
            $searchBar = $visual.find('.search_box .find_input .search_input');



        $visualList.slick({
            autoplay : false,
            speed: 1000,
            draggable: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots : $visual.find('.shortcut_list .shortcut_btn')

        });

        $ShortcutBtn.on('click', function(){
            var thisIndex = $(this).index(),
                $targetItem = $container.find('.target_list .target_item'),
                $targetIndex = $targetItem.index();

            $visualList.slick('slickGoTo', thisIndex);
            $targetList.slick('slickGoTo', thisIndex);
            $boardList.slick('slickGoTo', thisIndex);

            $(this).addClass('active').siblings().removeClass('active');
            // $DepthItem.eq(thisIndex).addClass('active').siblings().removeClass('active');
            $targetItem.removeClass('show').eq(thisIndex).addClass('show');
            $('body').attr('data-slide','slide' + thisIndex);
        });


        /*타겟리스트*/
        var  $targetList = $container.find('.target_list');

        $targetList.slick({
            autoplay : false,
            draggable: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            // asNavFor: $visualList,

        });

        /* ---------타겟별 게시판 슬릭*/
        var  $boardList = $container.find(".rowgroup3 .board_list");

        $boardList.slick({
            autoplay : false,
            draggable: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            // asNavFor: $visualList,
            arrows: false
        });

        /*공지사항 슬릭---------*/
        /*var  $noticeList = $container.find(".notice_list");*/

        $('.notice_list').each(function(){
            $(this).slick({
                autoplay : false,
                draggable: true,
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: $boardList,
                responsive: [
                    {
                        breakpoint: 1001,
                        settings: {
                            autoplay : false,
                            arrows:false,
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            variableWidth: true,
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            variableWidth: true,
                            slidesToShow: 1,
                        }
                    },
                ]

            });
        });

        setTimeout(() => $('.board_item:not(.slick-active)').find('a').attr('tabindex','-1'), 2000);


        /* 팝업존 */
        var $popupzone = $container.find('.popupzone'),
            $popupzoneSlickOpt = {
                slidesToShow  : 1,
                slidesToScroll: 1,
                speed         : 800,
                infinite      : true,
                arrow         : true,
                autoArrow: $popupzone.find('.popupzone_auto'),
                prevArrow     : $popupzone.find('.popupzone_prev'),
                nextArrow     : $popupzone.find('.popupzone_next'),
                current     : $popupzone.find('.popupzone_current'),
                total     : $popupzone.find('.popupzone_total'),
                autoplay      : true,
                draggable: false,
                variableWidth: false,
                customState : function(state) {
                    var current = state.current,
                        total = state.total;

                    if(current < 10) {
                        state.current = '0' + current;

                    }
                    if(total < 10) {
                        state.total = '0' + total;
                    }
                    return state;
                }
            };

        $('.popupzone .popupzone_list').slick($popupzoneSlickOpt);

    });
})(jQuery);
