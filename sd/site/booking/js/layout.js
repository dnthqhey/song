
(function($) {
    'use strict';

    window.element = {};

    var $window = element.$window = $(window),
        $document = element.$document = $(document),
        $html = element.$html = $('html'),
        $screen = $.screen,
        $isArray = $.isArray;

    //사이트
    var site = window.site,
        id = site.id,
        key = site.key,
        href = location.href;

    //아이디가 없을 때
    if(!id || id.substring(0, 2) === '@@' || id[0] === '$') {
        site.id = id = getParam(href, 'id') || href.split('/')[4];
    }

    //키가 없을 때
    if(!key || key.substring(0, 2) === '@@' || key[0] === '$') {
        site.key = key = getParam(href, 'key');
    }

    //screen
    $document.on('ready.layout', function(event) {
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1300
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1280,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });

    $(function() {

        var $header = element.$header = $('#header'),
            $container = element.$container = $('#container'),
            $footer = element.$footer = $('#footer');

        //사이트별 class추가
        if(site.id === 'main'){
            $html.addClass('main');
        }else if(site.id === 'tour'){
            $html.addClass('wide');
        }else{
            $html.addClass('public');
        }

        /* 언어 */
        var $language = $header.find('.language');

        $language.on('click', function(event) {
            var $this = $(this);
            $this.toggleClass('active');
            $this.find('.language_panel').stop(false, true).slideToggle('250', 'easeOutExpo');
        });


        /* 사이트 */
        var $site = $footer.find('.site'),
            $siteClose = $footer.find('.btn_close_box'),
            $siteBg = $footer.find('.site_bg'),
            $siteItem = $site.find('.site_item');

        $siteItem.on('click', function () {
            var $this = $(this);

            $site.find('.site_panel').slideUp('250', 'easeOutExpo');
            $siteBg.css('display', 'block');
            $siteClose.css('display','block');

            if($this.hasClass('active') === true){
                $this.removeClass('active');
                $this.find('.site_panel').slideUp('250', 'easeOutExpo');
                $siteBg.css('display', 'none');
                $siteClose.css('display','none');
            }else{
                $siteItem.find('.site_panel').slideUp('250', 'easeOutExpo');
                $this.addClass('active').siblings().removeClass('active');
                $this.find('.site_panel').slideDown('250', 'easeOutExpo');
                $siteBg.css('display', 'block');
                $siteClose.css('display','block');
            }
        });
        $siteClose.on('click', function () {
            $siteItem.removeClass('active');
            $siteItem.find('.site_panel').slideUp('250', 'easeOutExpo');
            $siteBg.css('display', 'none');
            $siteClose.css('display','none');
        });


        /* 공유 */
        var $share = $container.find('.share');

        $share.on('click', function(event) {
            $share.toggleClass('active');
        });

        /* 맨위로 */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $footerLink = $footer.find('.link'),
            $up = $footer.find('.up'),
            $upButton = $up.find('.up_button');

        if ($upButton.length){
            var footerLinkTop = $footerLink.offset().top,
                footerLinkHeight = $footerLink.height();

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
                if($window.scrollTop() > 100){
                    $up.addClass('show');
                }else{
                    $up.removeClass('show');
                }
                if($window.width() > 1500) {
                    if ((footerLinkTop < $window.scrollTop() + $window.height()) && (footerLinkTop > $window.scrollTop() - footerLinkHeight)) {
                        $up.addClass('bottom');
                    } else {
                        $up.removeClass('bottom');
                    }
                }
            });
        }

        var $gnb = $('.gnb'),
            $site =$gnb.find('.site'),
            $reserveItem = $site.find('.site_item.n5'),
            $reserveAnchor = $reserveItem.find('.site_anchor'),
            $date = new Date(),
            $day = $date.getDate();

        if($day == 1 || $day == 2 || $day == 3){
            $reserveItem.addClass('active');
        };

        if (!$('.satisfaction .manager_info span:contains("담당부서")').length > 0) {
            $('.satisfaction').hide();
        }

        $(function() {
            //햄버거 버튼 누르면 쿼리스트링 부여
            $('.lnb .menu_show .menu_btn').click(function(){
                var back_menu = window.location.href+ '#menu_opened';
                $(location).attr('href', back_menu);
            });

            //닫기버튼 누르면 쿼리스트링 삭제
            $('.lnb .menu_hide .menu_btn').click(function(){
                var back_menu = window.location.href,
                    back_menu = back_menu.replace('#menu_opened', '');
                $(location).attr('href', back_menu);

            });

            //url 변경 검증
            window.onhashchange = function() {
                var url = window.location.href;
                if(url.indexOf('#menu_opened') != -1){
                    //메뉴가 닫혔을 경우
                }else{
                    //메뉴가 열렸을 경우
                    $('html').removeClass('lnb_show lnb_open');
                }
            }
        });
    });
})(window.jQuery);



