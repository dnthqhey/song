
(function($) {
    'use strict';
    $(function () {
        window.element = {};

        var $window  = $(window),
            $document  = $(document),
            $html = $('html'),
            $isArray = $.isArray,
            $container  = $('#container'),
            $footer = $('#footer'),
            $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            main = $('#main').height(),
            $footerLink = $footer.find('address'),
            $up = $footer.find('.up'),
            $upButton = $up.find('.up_button'),
            footerLinkTop = $footerLink.offset().top;

        $upButton.on('click', function(event) {
            $htmlBody.animate({
                scrollTop : $wrapper.offset().top
            },{
                duration : 250,
                easing : 'easeOutExpo'
            });
            event.preventDefault();
        });

        $window.scroll(function(){
            if($window.scrollTop() > 80){
                $up.addClass('show');
                $('body').addClass('web_move');
            }else{
                $up.removeClass('show');
                $('body').removeClass('web_move');
            }
        });

        /* 네비 */
        $(function () {
            var top_height=302,
                col_total=$('.sub_cont').length,
                col_item=new Array;
            for(var i=0;i<col_total;i++){
                col_item[i]=$('.sub_cont').eq(i).offset();
            };

            $('.nav a').on('click',function(){
                $('body').addClass('web_move');
                console.log(this);
                var here_num=$(this).parents('li').index();

                $('html,body').stop().animate({scrollTop:$('.sub_cont').eq(here_num).offset().top-top_height},800);
            });
        });

        /* 스크롤힌트 */
        $(function () {
            if ($(window).width() < 1000) {
                $('.hint_area').on('touchstart', function () {
                    $(this).children('.mobile_scroll_hint').hide();
                });
            }
        });
        $('.seoul_btn').click(function () {
            if ($(this).siblings('.seoul_cont').hasClass('show')) {
                $(this).siblings('.seoul_cont').removeClass('show').slideUp();
                $(this).attr('title','열기');
            }else {
                $(this).siblings('.seoul_cont').addClass('show').slideDown();
                $(this).attr('title','닫기');
            }
        });
    });
})(window.jQuery);
