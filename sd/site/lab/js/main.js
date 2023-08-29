/**
 * @author (주)한신정보기술 퍼블리셔팀 안희정
 * @since 2020-06
 * @version 1.0.0
 */
(function($) {
    'use strict';

    $(function() {

        var $container = $('#container');

        //비쥬얼
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $controlDot = $visual.find('.visual_dot'),
            $controlArrow = $visual.find('.visual_arrow'),
            $arrowPrev = $controlArrow.find('.arrow_prev'),
            $arrowNext = $controlArrow.find('.arrow_next'),
            $autoBtn = $visual.find('.auto_btn');
        $visualList.slick({
            centerMode:true,
            slidesToShow :1,
            variableWidth: true,
            dots: true ,
            appendDots : $controlDot,
            prevArrow: $arrowPrev,
            nextArrow: $arrowNext,
            autoPlay : true,
            autoplaySpeed : 2000,
            playText :'재생',
            pauseText :'정지',
            autoArrow : $autoBtn,
            responsive:[
                {
                    breakpoint:1001,
                    settings:{
                        variableWidth:false
                    }
                },
                {
                    breakpoint:641,
                    settings:{
                        variableWidth:false,
                        centerMode:false
                    }
                }
            ]
        });

        //제안하기
        var $suggestion = $container.find('.suggestion'),
            $suggestionList = $suggestion.find('.suggestion_list'),
            $suggestionItem = $suggestionList.find('.suggestion_item');
        $suggestionList.slick({
            slidesToShow : 4,
            responsive:[
                {
                    breakpoint: 1001,
                    settings :{
                        slidesToShow: 3,
                        swipe:false
                    }
                },
                {
                    breakpoint: 641,
                    settings:{
                        infinite:false,
                        slidesToShow: 1,
                        swipe:true,
                        variableWidth:true
                    }
                }
            ]
        });
        $suggestionItem.attr('tabindex','-1');

        $suggestionItem.on('focusin mouseenter', function () {
            $suggestionItem.removeClass('focus');
            $(this).addClass('focus');
        });

        //생활연구단
        var $study = $container.find('.study'),
            $studyList = $study.find('.study_list'),
            $studyItem = $studyList.find('.study_item');
        $studyList.slick({
            slidesToShow : 4,
            draggable:true,
            responsive:[
                {
                    breakpoint: 1001,
                    settings :{
                        infinite:false,
                        slidesToShow :3,
                        prevArrow:null,
                        nextArrow:null,
                        swipe: true
                    }
                },
                {
                    breakpoint:641,
                    settings:{
                        infinite:false,
                        slidesToShow:2,
                        prevArrow:null,
                        nextArrow:null,
                        swipe: true
                    }
                }
            ]
        });

        $studyItem.on('focusin mouseenter', function () {
            $studyItem.removeClass('focus');
            $(this).addClass('focus');
        });
        $studyItem.removeAttr("tabindex");

        //성동구소식

        var $news = $container.find('.news'),
            $newsList = $news.find('.news_list'),
            $newsItem = $newsList.find('.news_item');

        $newsItem.on('focusin mouseenter', function () {
            $newsItem.removeClass('focus');
            $(this).addClass('focus');
        });
    });
})(window.jQuery);


