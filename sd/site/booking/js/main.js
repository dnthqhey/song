(function ($) {
    'use strict';

    $(function () {
        var $window = $(window),
            $container = element.$container = $('#container');

        $('.program_tab.r_tab').each(function (){
            var $notActiveTabMapCard = $(this).find('.tab_content').not('.active').find('.mapcard');
            setTimeout(function(){
                $notActiveTabMapCard.empty();
            }, 100);
        });
        $('.program_tab.r_tab .tab_total .tab_link').on('click', function(){
            var $this = $(this),
                $MyParent = $this.parent('li.tab_item'),
                IsActive = $MyParent.is('.active'),
                ParentIndex = $MyParent.index(),
                $OtherParents = $MyParent.siblings('li.tab_item'),
                $OtherBtns = $OtherParents.find('.tab_link'),
                $MyCon = $this.parents('.tab_total').siblings('.tab_content').eq(ParentIndex),
                $OtherCon = $MyCon.siblings('.tab_content'),
                $MyMapCard = $MyCon.find('.mapcard'),
                MyMapLat = $MyMapCard.attr('data-lat'),
                MyMapLng = $MyMapCard.attr('data-lng'),
                $OtherMapCard = $OtherCon.find('.mapcard');
            if(!IsActive){
                $OtherParents.removeClass('active');
                $OtherBtns.removeAttr('title');
                $MyParent.addClass('active');
                $this.attr('title', '선택됨');
                $OtherCon.removeClass('active').hide();
                $MyCon.addClass('active').show();
                if($OtherMapCard.length){
                    $OtherMapCard.empty();
                }
                if($MyMapCard.length){
                    $MyMapCard.checkMap({
                        lat : MyMapLat,
                        lng : MyMapLng
                    });
                }
            }else{
                $MyParent.removeClass('active');
                $this.removeAttr('title');
                $MyCon.removeClass('active').hide();
            };
        });

        $('.map_img area').each(function(){
            var areaIdx = $(this).index();
            $(this).mouseover(function(e) {
                $('.find_map').addClass('hover' + areaIdx);
            }).mouseout(function() {
                $('.find_map').removeClass('hover' + areaIdx);
            }).on('click',function(){
                $('.division').attr('class','division active' + areaIdx);
                $('.division_tab li').eq(areaIdx).addClass('active').siblings().removeClass('active');
                $('.division .map_btn').eq(areaIdx).addClass('active').siblings().removeClass('active');
            });
        });
        $('.division .map_btn').on('click',function(){
            var $this = $(this),
                tabButtonText = $this.find('span').text();
            $this.parents('.division_map').siblings('.division_tab').find('.tab_select span').text(tabButtonText);

        });

        $('.division button').each(function(){
            var btnIdx = $(this).parent().index() - 1;
            $(this).mouseover(function(e) {
                $('.find_map').addClass('hover' + btnIdx);
            }).mouseout(function() {
                $('.find_map').removeClass('hover' + btnIdx);
            });
        });

        /* 지도 탭메뉴 */
        var $tabMenu = $container.find('.d_menu'),
            $tabSelect = $tabMenu.find('.tab_select'),
            $tabDivision = $container.find('.division_tab');

        $tabSelect.click(function () {
            var $this = $(this),
                $ParentTabmenu = $this.parent('.d_menu'),
                IsActive = $ParentTabmenu.is('.active');
            if (!IsActive) {
                $this.next('.d_panel').stop().slideDown('250', 'easeOutExpo');
                $ParentTabmenu.addClass('active');
                if($('.search .tab_panel').hasClass('n01')){
                    $('.search .search_box').addClass('active open');
                }else{
                    $('.search .search_box').removeClass('active open');
                }
            } else {
                $this.next('.d_panel').stop().slideUp('250', 'easeOutExpo');
                $ParentTabmenu.removeClass('active');
                $('.search .search_box').removeClass('active open');
            };
        });
        
        $tabDivision.each(function(index, element){
            var $tabM = $tabDivision.find('.d_menu'),
                $DtabButton = $tabDivision.find('.tab_button_d'),
                tabAllCheck = $DtabButton.is('.tab_all'),/*전체보기 탭메뉴 유무*/
                $tabContent = $(element).find('.tab_content');

            var li_length = $tabM.find('.tab_item').length;
            $tabM.not($('.prettyprint').children()).addClass('divide' + li_length);

            $DtabButton.click(function () {
                var $this = $(this),
                    index = $DtabButton.index(this),
                    tabButtonText = $this.text(),
                    IsTabAll = $this.is('.tab_all'),
                    $tab_panel = $this.parents('.d_panel'),
                    $tab_menu = $this.parents('.d_menu');
                $this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button_d').removeAttr('title');
                $this.parents('.division_tab').find('.tab_select span').text(tabButtonText);
                if($('.search .tab_panel').hasClass('n01')){
                    $('.search .search_box').addClass('active');
                }
                else{
                    $('.search .search_box').removeClass('active open');
                }
                if (tabAllCheck){
                    if (IsTabAll) {
                        $tabContent.addClass('active');
                    } else {
                        $tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
                    };
                } else if (!tabAllCheck){
                    $tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
                }
                if ($window.width() <= 640) {
                    $tab_menu.removeClass('active');
                    $tab_panel.slideUp();
                };
                if ($window.width() <= 640 && IsTabAll) {
                    $tab_menu.removeClass('active');
                    $tab_panel.slideUp();
                };
            });
        });
        /* 지도 탭메뉴 끝 */

        var $window = element.$window = $(window),
            $container = element.$container = $('#container');

        /* search */
        var $search = $container.find('.search'),
            $searchTabButton = $search.find('.tab_button'),
            $searchTabPanel = $search.find('.tab_panel'),
            $ctgr2BoxList = $search.find('.ctgr_list');

        var VisualCount = null;
        $ctgr2BoxList.on('init', function(event, slick){
            VisualCount = slick.slideCount;
            setVisualCount();
            setVisualCurrentSlideNumber(slick.currentSlide);
        });
        $ctgr2BoxList.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            setVisualCurrentSlideNumber(nextSlide);
        });
        function setVisualCount() {
            var $StateBar = $('.search .totalbar .statebar');
            $StateBar.attr('data-total', VisualCount);
        }
        function setVisualCurrentSlideNumber(currentSlide) {
            var $StateBar = $('.search .totalbar .statebar'),
                StateBarWidth = 0,
                current = currentSlide + 1;
            StateBarWidth = (100 / VisualCount) * current;
            $StateBar.attr('data-current', currentSlide + 1).css('width', StateBarWidth+'%');
        }

        $ctgr2BoxList.each(function(){
            $(this).slick({
                slidesToShow: 5,
                slidesToScroll: 5,
                rows : 2,
                infinite: false,
                draggable: false,
                swipe: false,
                variableWidth: false,
                arrows : true,
                prevArrow : $(this).siblings('.box_control').find('.box_prev'),
                nextArrow : $(this).siblings('.box_control').find('.box_next'),
                dots: true,
                appendDots: $('.box_dots'),
                responsive: [
                    {
                        breakpoint: 1501,
                        settings: {
                            slidesToShow: 3,
                            infinite: true,
                            draggable: true,
                            swipe: true,
                            variableWidth: true,
                        }
                    }
                ]
            });
            $(this).slick('setPosition');
        });

        $searchTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            //$searchTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
            $searchTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').parents('form').siblings().find('.tab_panel').removeClass('active').removeAttr('title');
            
            $('.search .search_box').removeClass('active open');
            if($(this).parent().hasClass('n02')){
                $('.search .search_box').addClass('active');
            }else{
                $('.search .search_box').removeClass('active');
            }
        });

        $('.division button').each(function(){
            $(this).on('click', function(){
                function findTab(){
                    $('.division').attr('class','division active' + btnIdx);
                    $('.division_tab li').eq(btnIdx).addClass('active').siblings().removeClass('active');
                    $('.division .map_btn').eq(btnIdx).addClass('active').siblings().removeClass('active');
                }
                if($(this).parent().hasClass('map_btn')){
                    var btnIdx = $(this).parent().index() - 1;
                    findTab();
                }else{
                    var btnIdx = $(this).parent().index();
                    findTab();
                }
            });
        });


        /* service */
        var $service = $container.find('.service'),
            $serviceTabButton = $service.find('.tab_button'),
            $serviceTabPanel = $service.find('.tab_panel'),
            $serviceBoxList = $service.find('.box_list'),
            $serviceWrap = $service.find('.category_wrap'),
            serviceSlickOpt = {
                autoplay : true,
                autoplaySpeed: 4000,
                speed: 700,
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                draggable: false,
                swipe: false,
                variableWidth: false,
                arrows : true,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1441,
                        settings: {
                            slidesToShow: 3,
                            infinite: true,
                            draggable: true,
                            swipe: true,
                        }
                    }
                ]
            };


        function serviceSlick() {
            if ($window.width() < 1001) {
                $serviceBoxList.each(function() {
                    $(this).slick('unslick');
                })
            } else {
                $serviceBoxList.each(function() {
                    $(this).slick(serviceSlickOpt);
                })
                $(this).slick(serviceSlickOpt);
            }
        }
        $window.scroll(function(){
            serviceSlick();
        });
        serviceSlick();


        $serviceTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $serviceTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

        });

        /* 반응형 탭 그라데이션 */
        $serviceWrap.scroll( function() {
            var $this = $(this);

            if( $this[0].scrollWidth - $this.scrollLeft() - '20' <= $this.outerWidth()) {
                $this.addClass('end');
            }else{
                $this.removeClass('end');
            }
        });


        /* news */
        var $news = $container.find('.news'),
            $newsTabButton = $news.find('.tab_button'),
            $newsTabPanel = $news.find('.tab_panel'),
            $newsBoxList = $news.find('.box_list'),
            $newsWrap = $news.find('.tab_wrap');

        $newsBoxList.each(function(){
            $(this).slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                draggable: false,
                swipe: false,
                variableWidth: false,
                arrows : true,
                prevArrow : $(this).siblings('.box_control').find('.box_prev'),
                nextArrow : $(this).siblings('.box_control').find('.box_next'),
                dots: false,
                responsive: [
                    {
                        breakpoint: 1441,
                        settings: {
                            slidesToShow: 2,
                            infinite: true,
                            draggable: true,
                            swipe: true,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 2,
                            infinite: true,
                            draggable: true,
                            swipe: true,
                            variableWidth: true,
                        }
                    }
                ]
            });
            $(this).slick('setPosition');
        });

        /* 반응형 탭 그라데이션 */
        $newsWrap.scroll( function() {
            var $this = $(this);

            if( $this[0].scrollWidth - $this.scrollLeft() - '20' <= $this.outerWidth()) {
                $this.addClass('end');
            }else{
                $this.removeClass('end');
            }
        });

        $newsTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $newsTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
        });

        var $shortcut = $container.find('.shortcut'),
            $shortcutList = $shortcut.find('.shortcut_list'),
            $shortcutPrev = $shortcut.find('.shortcut_prev'),
            $shortcutNext = $shortcut.find('.shortcut_next'),
            shortcutSlickOpt = {
                slidesToShow  : 10,
                slidesToScroll: 1,
                infinite      : false,
                prevArrow     : $shortcutPrev,
                nextArrow     : $shortcutNext,
                arrows        : true,
                responsive    : [
                    {
                        breakpoint: 1441,
                        settings  : {
                            slidesToShow: 6
                        }
                    }
                ]
            };

        function shortcutSlick() {
            if ($window.width() < 1001) {
                $shortcutList.slick('unslick');
            } else {
                $shortcutList.slick(shortcutSlickOpt);
            }
        }

        shortcutSlick();
        $window.scroll(function(){
            shortcutSlick();
        });

    });
})(window.jQuery);