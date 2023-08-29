/**
 * @author (주)한신정보기술 퍼블리셔팀 송경배
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


		/* 토글(open&close) */
		var $toggle = $('.toggle'),
			$toggleButton = $toggle.find('button');

		$toggleButton.on('click', function () {
			var $this = $(this),
				$parent = $this.parent(),
				splitClass = $this.attr('class').split('_'),
				isParentTag = $this.parent().is('li'),
				parentClass = splitClass[0],
				childrenClass = splitClass[1];

			if (childrenClass === 'open' || childrenClass === 'button') {
				if(isParentTag === true){
					//부모가 li일때
					$parent.addClass('active').siblings().removeClass('active');
				}else{
					$this.closest('.toggle').addClass('active').siblings().removeClass('active');
				}
			} else {
				$this.closest('.active').removeClass('active');
			}

			/*
			if (childrenClass === 'open' || childrenClass === 'button') {
				if (!$parent.hasClass('active')) {
					$parent.addClass('active').siblings().removeClass('active');
				} else {
					$parent.removeClass('active');
				}
			} else {
				console.log('close');
				$this.closest('.active').removeClass('active');
			}


			*/
		});


		/* content tab */
		var $tab = $container.find('.tab'),
			$tabButton = $tab.find('.tab_button'),
			$tabContent = $tab.find('.tab_content');

		$tabButton.click(function () {
			var $this = $(this),
				index = $tabButton.index(this),
				tabButtonText = $this.text();

			$this.closest('.tab_item').addClass('active').siblings().removeClass('active');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText)
			$tabContent.eq(index).addClass('active').siblings().removeClass('active');
		});


		/* 스텝 자동 높이 */
		function stepAutoHeight(){
			var $step = $container.find('.step'),
				$stepList = $step.find('.step_list');

			$stepList.each(function (index, element) {
				var height = 0;
				$('.step_item', element).each(function () {
					var $this = $(this),
						thisHeight = $this.find('.step_content').height();

					if (thisHeight > height) {
						height = thisHeight;
					}
				}).height(height);
			});
		}
		stepAutoHeight();


		/* 맨위로 */
		var $htmlBody = $('html, body'),
			$wrapper = $('#wrapper'),
			$upButton = $('.up_button');

		$upButton.click(function (event) {
			$htmlBody.animate({
				scrollTop : $wrapper.offset().top
			},{
				duration : 250
			});
			event.preventDefault();
		});

	});
})(window.jQuery);