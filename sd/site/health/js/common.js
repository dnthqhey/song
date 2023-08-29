/**
 * @author (주)한신정보기술 퍼블리셔팀 송경배
 * @since 2020-05-19
 * @version 1.0.0
 */
(function($) {
	'use strict';

	$(function() {

		var $window = element.$window = $(window),
			$html = element.$html = $('html'),
			$header = element.$header = $('#header'),
			$container = element.$container = $('#container'),
			$footer = element.$footer = $('#footer');

		$window.on('screen', function(event) {
			stepAutoHeight();
		});

		$window.on('screen:wide screen:web', function(event) {
			//lnbAutoWidth();
		});

		/*
		$window.on('screen:phone', function(event) {
			window.mode = 'phone';
		});
		*/

		/* 토글(open&close) */

		// var $toggle = $('.toggle'),
		// 	$toggleButton = $toggle.find('button');
		//
		// $toggleButton.on('click', function () {
		// 	var $this = $(this),
		// 		$parent = $this.parent(),
		// 		splitClass = $this.attr('class').split('_'),
		// 		isParentTag = $this.parent().is('li'),
		// 		//parentClass = splitClass[0],
		// 		childrenClass = splitClass[1];
		//
		// 	if (childrenClass === 'open' || childrenClass === 'button') {
		// 		if (!$parent.hasClass('active')) {
		// 			if (isParentTag === true) {
		// 				//부모가 li일때
		// 				$parent.addClass('active').siblings().removeClass('active');
		// 			} else {
		// 				$this.closest('.toggle').addClass('active').siblings().removeClass('active');
		// 			}
		// 		} else {
		// 			$this.closest('.active').removeClass('active');
		// 		}
		// 	} else {
		// 		$this.closest('.active').removeClass('active');
		// 	}
		// });

		/* 언어 */
		var $language = $header.find('.language');
		/*$languagePanel = $language.find('.language_panel');*/

		$language.on('click', function(event) {
			var $this = $(this);
			$this.toggleClass('active');
			$this.find('.language_panel').stop(false, true).slideToggle('250', 'easeOutExpo');
		});


		/* 검색 */
		var $search = $header.find('.search'),
			$searchOpen = $search.find('.search_open'),
			$searchClose = $search.find('.search_close');

		$searchOpen.on('click', function(event) {
			$search.toggleClass('active');
		});
		$searchClose.on('click', function(event) {
			$search.removeClass('active');
		});

		/* 공유 */
		var $share = $container.find('.share');

		$share.on('click', function(event) {
			$share.toggleClass('active');
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

		/* 1차메뉴 개수 체크 */
		var $lnb = $header.find('.lnb'),
			depth1ListLenght = $lnb.find('.depth1_item').length;

		$lnb.addClass('length' + depth1ListLenght);

		if(depth1ListLenght <= 5){
			$html.addClass('min');
		}else{
			$html.addClass('max');
		}

		/* 1차메뉴 자동 정렬 */
		function lnbAutoWidth() {
			/*
			var $lnb = $header.find('.lnb'),
				$depth1Item = $lnb.find('.depth1_item'),
				depth1Width = $lnb.find('.depth1').width(),
				depth1ListWidth = $lnb.find('.depth1_list').width(),
				depth1ItemWidth = 0,
				limitWidth = 450,
				limitLength = 5,
				count;
			*/
			$depth1Item.each(function (index, element) {
				var $element = $(element);
				count = index + 1;
				depth1ItemWidth += $element.innerWidth();
			});

			$lnb.addClass('length' + count);
			//console.log('전체 :' + depth1Width, '리스트 :' + depth1ListWidth, '아이템 :' + depth1ItemWidth);

			if(limitWidth > depth1ItemWidth && count <= limitLength){
				$html.addClass('min');
				$depth1Item.css({'margin-left' : parseInt((((depth1ListWidth - depth1ItemWidth) / count) * 100) / depth1Width) + '%'})
			}else{
				$html.addClass('max');
			}
		}


		/* cms 탭메뉴 */
		var $tabMenu = $container.find('.tab_menu.type2'),
			$tabSelect = $tabMenu.find('.tab_select');

		$tabSelect.click(function () {
			$(this).next('.tab_panel').slideToggle('250', 'easeOutExpo');
			$tabMenu.toggleClass('active');
		});


		/* 컨텐츠 탭메뉴 */
		var $tab = $container.find('.tab'),
			$tabButton = $tab.find('.tab_button'),
			$tabContent = $tab.find('.tab_content'),
			tabActiveText = $tab.find('.tab_menu.type2 .tab_item.active').text();

		$tab.find('.tab_select span').text(tabActiveText);

		$tabButton.click(function () {
			var $this = $(this),
				index = $tabButton.index(this),
				tabButtonText = $this.text();

			$this.closest('.tab_item').addClass('active').siblings().removeClass('active');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);
			$tabContent.eq(index).addClass('active').siblings().removeClass('active');
			/*
			if(mode === 'phone'){
				if($this.parents().hasClass('tab_menu type2')){
					$this.closest('.tab').find('.tab_panel').slideUp();
				}
			}
			*/
		});


		/* 스텝박스 자동 높이 */
		function stepAutoHeight(){
			var $step = $container.find('.step'),
				$stepList = $step.find('.step_list');

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
				/*
				if(width < 210){
					$element.closest('.step').addClass('min_width');
				}else{
					$element.closest('.step').addClass('max_width');
				}
				*/
				$element.closest('.step').addClass('length' + count);
			});
		}


		/* 맨위로 */
		var $htmlBody = $('html, body'),
			$wrapper = $('#wrapper'),
			$up = $footer.find('.up'),
			$upButton = $up.find('.up_button');

		$upButton.click(function (event) {
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