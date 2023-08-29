(function($) {
	'use strict';

	$(function() {

		var $container = element.$container = $('#container');

		/* 비주얼 */
		var $visual = $container.find('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualCurrent = $visual.find('.visual_current'),
			$visualTotal =  $visual.find('.visual_total'),
			$visualPrev = $visual.find('.visual_prev'),
			$visualNext = $visual.find('.visual_next');

		$visualList.slick({
			vertical: true,
			slidesToShow: 1,
			autoplay: false,
			current : $visualCurrent,
			total : $visualTotal,
			arrows: true,
			prevArrow: $visualPrev,
			nextArrow: $visualNext,
			responsive: [{
				breakpoint: 641,
				settings: {
					vertical: false
				}
			}]
		});

		function visualCurrentTotal(){
			$visualCurrent.text('0' + $visualCurrent.text());
			$visualTotal.text('0' + $visualTotal.text());
		}
		visualCurrentTotal();

		$visualList.on('afterChange', function(event, slick, currentSlide, nextSlide){
			visualCurrentTotal();
		});

		/* 바로가기 */
		var $shortcut = $container.find('.shortcut'),
			$shortcutList = $shortcut.find('.shortcut_list'),
			$shortcutPrev = $shortcut.find('.shortcut_prev'),
			$shortcutNext = $shortcut.find('.shortcut_next');

		$shortcutList.slick({
			slidesToShow: 6,
			arrows: true,
			prevArrow: $shortcutPrev,
			nextArrow: $shortcutNext,
			responsive: [{
				breakpoint: 641,
				settings: {
					slidesToShow: 3,
				}
			}]
		});


		/*  */
		var $sights = $container.find('.sights'),
			$sightsList = $sights.find('.sights_list'),
			$sightsPrev = $sights.find('.sights_prev'),
			$sightsNext = $sights.find('.sights_next');

		$sightsList.slick({
			infinite: true,
			slidesToShow: 3,
			variableWidth: true,
			arrows: true,
			prevArrow: $sightsPrev,
			nextArrow: $sightsNext,
			responsive: [{
				breakpoint: 641,
				settings: {
					//dots: false,
				}
			}]
		});
		/* 애니메이션 확인 필요 */

		/* news */
		var $news = $container.find('.news2'),
			$newsList = $news.find('.news_list'),
			$newsCurrent = $news.find('.news_current'),
			$newsTotal = $news.find('.news_total'),
			$newsPrev = $news.find('.news_prev'),
			$newsNext = $news.find('.news_next');

		$newsList.slick({
			slidesToShow: 1,
			autoplay    : false,
			current     : $newsCurrent,
			total       : $newsTotal,
			prevArrow   : $newsPrev,
			nextArrow   : $newsNext,
			responsive:[
				{
					breakpoint: 641,
					settings : {
						slidesToShow:1,
						variableWidth:false
					}
				}
			]
		});
	});
})(window.jQuery);