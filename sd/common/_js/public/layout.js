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
				$.tag.lnb = $.tag.header.children('.lnb');
				$.tag.lnbNav = $.tag.lnb.children('.nav');
				$.tag.lnbNavActivedText = $.tag.lnbNav.find('a[data-menu-actived]');

				var lnb = {
					type : parseInt($.tag.lnbNav.attr('data-menu-type'), 10) || 1,
					option : {
						cut : {
							2 : 4
						},
						namespace : 'lnb'
					}
				};

				$.tag.wdw.on('responsive.publicLayout', function(event) {
					//wide, web, tablet, phone분기에 걸렸을때
					if($.inArray(event.state, event.settings.rangeProperty) > -1) {
						var menuEvent = 'click',
							menuType = 4;
						
						//wide 또는 web일때
						if(event.state === 'wide' || event.state === 'web') {
							menuEvent = 'mouse';
							menuType = lnb.type;
							$.tag.lnbNavActivedText.removeAttr('data-menu-actived');
						}else{
							$.tag.lnbNavActivedText.attr('data-menu-actived', '');
						}
						
						//현재 메뉴 이벤트와 분기에 따른 메뉴 이벤트가 다를때
						if(lnb.option.event !== menuEvent) {
							//메뉴 이벤트 변경
							lnb.option.event = menuEvent;

							//data-menu-type변경하고 새로운메뉴 생성 후 data-menu-type복귀
							$.tag.lnbNav.attr('data-menu-type', menuType).menu(lnb.option).attr('data-menu-type', lnb.type);
						}
					}
				});

				//배너
				$.tag.footerBanner = $.tag.footer.children('.banner');
				$.tag.footerBannerWrap = $.tag.footerBanner.find('.banner_wrap');
				
				$.tag.footerBannerWrap.slick({
					draggable : false,
					swipe : false,
					touchMove : false,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
					cssEase : 'cubic-bezier(1, 0, 0, 1)',
					speed : 250,
					variableWidth : true,
					autoplay : true,
					playText : '재생',
					pauseText : '정지',
					prevArrow : $.tag.footerBanner.find('.banner_prev'),
					nextArrow : $.tag.footerBanner.find('.banner_next'),
					autoArrow : $.tag.footerBanner.find('.banner_auto'),
					responsive : [{
						breakpoint : 1001,
						settings : {
							draggable : true,
							swipe : true,
							touchMove : true
						}
					}]
				});

				//하단 사이트
				$.tag.site = $.tag.footer.find('.site');
				$.tag.siteButton = $.tag.site.find('.site_button');

				$.tag.siteButton.on('click.publicLayout', function(event) {
					var $this = $(this),
						$siteList = $this.next('.site_list');
					
					//애니메이션이 끝났을때
					if(!$siteList.is(':animated')) {
						$siteList.slideToggle(250, 'easeInOutExpo').parent('li').toggleClass('active').siblings('li').removeClass('active').children('.site_list').slideUp(250, 'easeInOutExpo');
					}
				});
			});

			$.tag.dcmt.on('ready.publicLayout', function(event) {
				$.responsive({
					range : {
						wide : {
							horizontal : {
								from : 9999,
								to : 1241
							}
						},
						web : {
							horizontal : {
								from : 1240,
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
						property : 'web'
					}
				});
			});
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}