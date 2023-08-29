
'use strict';

try {
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//태그객체
			$.tag = {
				wdw : $(window),
				dcmt : $(document),
				html : $('html')
			};
			$(function() {
				
				//여기서부터 코드 작성해주세요

				$.tag.wdw.on('responsive.main', function(event) {
					
					if(event.state == 'wide' || event.state == 'web') {
						
					}
					if(event.state == 'tablet' || event.state == 'phone') {

					}

				});

			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}