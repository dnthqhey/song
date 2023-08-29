
(function($) {
	'use strict';

	$(function() {
		var $window = element.$window = $(window),
			$html = element.$html = $('html'),
			$container = element.$container = $('#container');

		/* 경로 path */
		var $path = $container.find('.path'),
			pathOffset = $path.offset().top;

		$window.on('scroll', function() {
			var scrollTop = $window.scrollTop();
			if(scrollTop > pathOffset){
				$html.addClass('fixed');
			}else{
				$html.removeClass('fixed');
			}
		});
	});
})(window.jQuery);