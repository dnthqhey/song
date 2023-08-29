
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
            $siteItem = $site.find('.site_item');

        $siteItem.on('click', function () {
            var $this = $(this);

            $site.find('.site_panel').slideUp('250', 'easeOutExpo');

            if($this.hasClass('active') === true){
                $this.removeClass('active');
                $this.find('.site_panel').slideUp('250', 'easeOutExpo');
                $this.find('.site_panel:before').slideUp('250', 'easeOutExpo');
            }else{
                $this.addClass('active').siblings().removeClass('active');
                $this.find('.site_panel').slideDown('250', 'easeOutExpo');
                $this.find('.site_panel:before').slideUp('250', 'easeOutExpo');
            }
        });

        /* 공유 */
        var $share = $container.find('.share');

        $share.on('click', function(event) {
            $share.toggleClass('active');
        });

        /* 맨위로 */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $up = $footer.find('.up'),
            $upButton = $up.find('.up_button');

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
            if($(document).height() <= $window.scrollTop() + $window.height()){
                $up.addClass('bottom');
            }else{
                $up.removeClass('bottom');
            }
        });

    });
})(window.jQuery);



