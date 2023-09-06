

'use strict';

try {
	this.mode = '';
	
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

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
				var $nav = $('#lnb .nav'),
					navMenuType = parseInt($nav.attr('data-menu-type'), 10) || 1,
					navOption = {
						cut : {2:4},
						namespace : 'lnb'
					};

				//여기서부터 코드 작성해주세요

				$.tag.wdw.on('responsive.common', function(event) {
					
					//wide, web, tablet, phone분기에 걸렸을때
					if($.inArray(event.state, event.setting.rangeProperty) > -1) {
						var menuEvent = 'click',
							menuType = 4;

						//wide 또는 web일때
						if(event.state === 'wide' || event.state === 'web') {
							menuEvent = 'mouse';
							menuType = navMenuType;
							$('#lnb a').removeAttr('data-menu-actived');
						}
						
						//현재 메뉴 이벤트와 분기에 따른 메뉴 이벤트가 다를때
						if(navOption.event !== menuEvent) {
							//메뉴가 셋팅되어 있을때 파괴
							if($nav.hasClass('menu_initialized')) {
								$nav.menu('destroy');
							}
							
							//메뉴 이벤트 변경
							navOption.event = menuEvent;

							//data-menu-type변경하고 새로운메뉴 생성 후 data-menu-type복귀
							$nav.attr('data-menu-type', menuType).menu(navOption).attr('data-menu-type', navMenuType);
						}
					}

					if(event.state == 'wide' || event.state == 'web') {
						mode = 'pc';
						$('.depth1_item:last-child .depth2_item').each(function(index, element) {
							var $this = $(element),
								$index = index+1;
							$this.addClass('icon'+$index)
						})

					}else if(event.state == 'tablet') {
						mode = 'tablet';
					}else if(event.state == 'phone') {
						mode = 'mobile';
					};
					
					if(event.state == 'wide') {
						
						
					};
					

					//태블릿 || 모바일
					if(event.state == 'tablet' || event.state == 'phone') {
					};
					
				});
			});

			$.tag.dcmt.on('ready.common', function(event) {
			   $.responsive({
					range : {
						wide : {
							horizontal : {
								from : 9999,
								to : 1201
							}
						},
						web : {
							horizontal : {
								from : 1200,
								to : 1001
							}
						},
						tablet : {
							horizontal : {
								from : 1000,
								to : 641
							}
						},
						phone : {
							horizontal : {
								from : 640,
								to : 0
							}
						}
					},
					lowIE : {
						property : ['web']
					},
					inheritClass : false
				});
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}
