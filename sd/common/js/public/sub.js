/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현
 * @since 2018-08-13
 * @version 1.0.0
 */
try {
	//$ 중첩 방지
	(function($) {
		'use strict';

		//제이쿼리가 있는지 확인
		if(typeof $ === 'function') {
			$(function() {
				//사이드
				$.tag.side = $.tag.container.find('.side');
				$.tag.sideMenu = $.tag.side.children('.side_menu');

				$.tag.sideMenu.menu({
					namespace : 'side',
					event : 'click'
				});
			});
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}