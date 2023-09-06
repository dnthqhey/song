var $widnow = $(window);

$widnow.on('load', function(event) {
    /**
     * @name 스크롤 넓이 지정
     * @param {element} element
     * @since 2018-07-13
     */
    function setScrollWidth(element) {
        var $element = $(element),
            $item = $element.children(),
            width = 0;

        $item.each(function(index, element) {
            width += ($item.eq(index).outerWidth(true) || 0) + 1;
        });

        $element.width(width);
    }

    //스크롤 처리
    $widnow.on('resize', function(event) {
        setScrollWidth('.fit ul');
        setScrollWidth('.lnb ul');
    }).triggerHandler('resize');

	//검색어 제거
	$('.removetext').on('click', function(event) {
		var $totalsearch = $('.total_search');
		$totalsearch.prop('value', '');
	});

    //인기검색어
    var $rank = $('.rank'),
        $rankTabContent = $rank.find('.tab_content');

    $rank.find('.tab_nav a').on('click', function(event) {
        var $this = $(this);

        $this.addClass('active').siblings('a').removeClass('active');
        $rankTabContent.removeClass('active').eq($this.index()).addClass('active');

        event.preventDefault();
    });

    //옵션
    $('.option_btn').on('click', function(event) {
        var $this = $(this),
            $optionType = $this.parents('.option_type'),
            $optionList = $optionType.children('ul');

        //애니메이션이 끝났을 때
        if(!$optionList.is(':animated')) {
            $optionList.slideToggle(250);
            $optionType.toggleClass('active').siblings('.option_type').removeClass('active').children('ul').slideUp(250);
        }
    });

    //달력 토글
    $('.calendar_btn').on('click', function(event) {
        var $this = $(this),
            $calendarContent = $this.next('.calendar_content');

        //애니메이션이 끝났을 때
        if(!$calendarContent.is(':animated')) {
            $calendarContent.slideToggle(250).parent('.calendar').toggleClass('active');
        }
    });

    //달력 닫기
    $('.calendar_close, .calendar_submit').on('click', function(event) {
        var $this = $(this),
            $calendarContent = $this.parents('.calendar_content');

        //애니메이션이 끝났을 때
        if(!$calendarContent.is(':animated')) {
            $calendarContent.slideUp(250).parents('.calendar').removeClass('active');
        }
    });
});