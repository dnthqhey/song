'use strict';

try {

	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			$(function() {
				//side메뉴
				$('.side_menu').menu({
					cut : {},
					event : 'click',
					namespace : 'side'
				});

				//여기서부터 코드 작성해주세요


				$('.tab_menu').not($('.prettyprint').children()).each(function() {
					var li_length = $(this).children('ul').find('li').length;
					$(this).addClass('divide'+li_length);
				});

				$.tag.wdw.on('responsive.sub', function(event) {
					if(event.state == 'wide' || event.state == 'web') {
						
					}
					if(event.state == 'tablet' || event.state == 'phone') {

					};
				});

				$('table.table.responsive').not($('.prettyprint').children()).each(function() {
					var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
						TheadExist = $(this).find('thead').length;
					if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
						$(this).children('tbody').children('tr').find('th, td').each(function() {
							var ThisIndex = $(this).index(),
								TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
							$(this).attr('data-content', TheadText);
						});
						$(this).children('tfoot').children('tr').find('th, td').each(function() {
							var ThisIndex = $(this).index(),
								TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
							$(this).attr('data-content', TheadText);
						});
					};
				});
				
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}