/**
 * @author (주)한신정보기술 퍼블리셔팀 송경배
 * @since 2020-05-19
 * @version 1.0.0
 */
(function($) {
	'use strict';

	$(function() {
		//news
		var $news = $('.rowgroup .news'),
			$newsTablist = $news.find('.news_tablist'),
			$newsTabitem = $newsTablist.find('.news_tabitem'),
			$newsButton = $newsTabitem.find('.news_button'),
			$newsContents = $news.find('.news_contents');

			$newsButton.on('click focusin', function () {
				var dataClass = $(this).attr('data-class');

				$newsTabitem.removeClass('active');
				$(this).closest('li').addClass('active');

				$newsContents.removeClass('active');

				$('.news_contents[id = ' + dataClass + ']').addClass('active');

			});

		//shortcut
		var $shortcut = $('.shortcut'),
			$shortcutList = $shortcut.find('.shortcut_list'),
			$shortcutItem = $shortcutList.find('.shortcut_item');

			$shortcutItem.on('mouseenter focusin',function () {
				$shortcutItem.removeClass('on');

				$(this).addClass('on');
			});


		//gallery
		var $gallery = $('.rowgroup3 .gallery'),
			$galleryList = $gallery.find('.gallery_list'),
			$galleryItem = $galleryList.find('.gallery_item'),
			$galleryControl = $gallery.find('.gallery_control'),
			$galleryPrev = $galleryControl.find('.gallery_prev'),
			$galleryNext = $galleryControl.find('.gallery_next');

		$galleryItem.on('click mouseenter focusin', function(){
			$galleryItem.removeClass('active');
			$(this).addClass('active');
		});

		$galleryList.slick({
			slidesToShow:3,
			slidesToScroll:1,
			infinite:true,
			prevArrow:$galleryPrev,
			nextArrow:$galleryNext,
			responsive:[
				{
					breakpoint:1001,
					settings:{
						slidesToShow:3,
						variableWidth:true
					}
				},
				{
					breakpoint:641,
					settings:{
						slidesToShow:1,
						variableWidth:false
					}
				}
			]
		});
		$galleryItem.removeAttr('tabindex');





	});
})(window.jQuery);