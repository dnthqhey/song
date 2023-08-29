(function($) {
	'use strict';

	$(function() {

		var $window = element.$window = $(window),
			$html = element.$html = $('html'),
			$header = element.$header = $('#header'),
			$container = element.$container = $('#container'),
			$footer = element.$footer = $('#footer');

		/* lnb */
		var $lnb = $header.find('.lnb'),
			$depth1Item = $lnb.find('.depth1_item');

		$depth1Item.each(function(index, element) {
			var $element = $(element);
			$element.addClass('n' + (index + 1));
		});

	});
})(window.jQuery);