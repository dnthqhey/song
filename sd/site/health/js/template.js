/**
 * @author (주)한신정보기술 퍼블리셔팀 김지원
 * @since 2020-00-00
 * @version 1.0.0
 */
(function($) {
    'use strict';

    $(function() {
        var $window = element.$window = $(window),
            $html = element.$html = $('html'),
            $container = element.$container = $('#container'),
            $footer = element.$footer = $('#footer');


        $window.on('screen', function(event) {
            stepAutoHeight();
        });

        /* 스텝 자동 높이 */
        function stepAutoHeight(){
            var $step = $container.find('.step'),
                $stepList = $step.find('.step_list'),
                $stepItem = $stepList.find('.step_item');

            $stepList.each(function (index, element) {
                var $element = $(element),
                    height = 0,
                    width = 0,
                    count;

                $('.step_item', element).each(function (index) {
                    var $this = $(this),
                        thisWidth = $this.find('.step_content').width(),
                        thisHeight = $this.find('.step_content').height();

                    if (thisWidth > width){
                        width = thisWidth;
                    }

                    if (thisHeight > height) {
                        height = thisHeight;
                    }

                    count = index + 1;
                }).height(height);
                
                $element.closest('.step').addClass('length' + count);
            });
        }
        stepAutoHeight();

        //테이블 thead tr 두 개 이상 스타일
        $('.table thead tr').each(function(){
            var trIndex = $(this).index() + 1;

            if (trIndex > 1) {
                $(this).closest('.table').addClass('tr_over');
            }
        });

        //인풋 포커스
        var selectTarget = $('.sd_input input[type="text"]');
        selectTarget.on({
            'focus' : function () {
                $(this).parent().addClass('focus');
            },
            'blur' : function () {
                $(this).parent().removeClass('focus');
            }
        });

        //모달창
        $('.modal_btn').on('click', function() {
            $('html').toggleClass('modal_open');
        });

        $('.modal_close').on('click', function() {
            $('html').toggleClass('modal_open');
        });


        /* 탬플릿 전체보기 */
        var $tab = $container.find('.tab.template'),
            $tabAll = $tab.find('.tab_all'),
            $tabContent = $tab.find('.tab_content');

        $tabContent.addClass('active');
        $tabAll.click(function (event) {
            var $this = $(this);

            $this.closest('.tab_item').addClass('active').siblings().removeClass('active');
            $tabContent.addClass('active');

            /*
            $this.closest('.tab_item').addClass('active').siblings().removeClass('active');
            $this.parents('.tab').find('.tab_select span').text(tabButtonText);
            $tabContent.eq(index).addClass('active').siblings().removeClass('active');
            */
        });


    });
})(window.jQuery);