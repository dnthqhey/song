/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현
 * @since 2018-08-13
 * @version 1.0.0
 */
try {
	//$ 중첩 방지
	(function($) {
		'use strict';

		/**
		 * @name getParam
		 * @param {string} value
		 * @param {string} name
		 * @return {number}
		 * @since 2018-07-13
		 */
		window.getParam = function(value, name) {
			var result = '';

			//문자일 때
			if(typeof value === 'string') {
				var param = value.split('?')[1];

				//문자이면서 파라미터가 있을 때
				if(typeof name === 'string' && param) {
					param = param.split('&');

					for(var i = 0, paramLength = param.length; i < paramLength; i++) {
						var paramI = param[i].split('=');

						//찾는 값이 있을때
						if(name === paramI[0]) {
							var valueI = paramI[1] || '';

							result = decodeURIComponent(valueI);

							//인코딩된 값일 때
							if(valueI !== result) {
								result = decodeURIComponent(valueI.replace(/\+/g, '%20'));
							}

							break;
						}
					}
				}
			}

			return result;
		};

		//제이쿼리가 있는지 확인
		if(typeof $ === 'function') {
			$.tag = {
				wdw : $(window),
				dcmt : $(document),
				html : $('html'),
				head : $('head')
			};

			$.variable = {};

			$(function() {
				$.tag.body = $('body');
				$.tag.wrapper = $('#wrapper');
				$.tag.header = $('#header');
				$.tag.container = $('#container');
				$.tag.footer = $('#footer');

				//탭메뉴
				$.tag.tabMenu = $.tag.container.find('.tab_menu');
				$.tag.tabWrap = $.tag.tabMenu.children('.tab_wrap');
				$.tag.tabUL = $.tag.tabWrap.children('ul');
				$.tag.tabLI = $.tag.tabUL.children('li');
				$.tag.tabContent = $.tag.tabLI.children('.tab_content');
				$.tag.tabButton = $.tag.tabLI.children('.tab_button');

				$.tag.tabButton.on('click.layout', function(event) {
					var $this = $(this),
						hash = this.hash,
						tagName = this.tagName.toLowerCase();

					//해쉬가 있거나 버튼일때
					if(hash || tagName === 'button') {
						//클래스 처리
						$this.parents('li').addClass('active').siblings('li').removeClass('active');

						//영역 처리
						$this.parents('.tab_menu').each(function(index, element) {
							var $element = $(element),
								outerHeight = $element.find(' > .tab_wrap > ul > li.active > .tab_content').outerHeight() || '',
								unlock = $element.data('unlock') || '',
								unlockCount = 1;

							if(unlock) {
								unlock = unlock.split(',');
								unlockCount = unlock.length;
							}

							for(var i = 0; i < unlockCount; i++) {
								if($.inArray(unlock[i], $.responsive.settings.nowState) > -1) {
									$element.css('padding-bottom', '');
									break;
								}else{
									$element.css('padding-bottom', outerHeight);
								}
							}
						});
					}
				});

				$.tag.wdw.on('responsive:all.layout', function(event) {
					//탭메뉴
					$.tag.tabActiveLI = $($.tag.tabLI.filter('.active').get().reverse());
					$.tag.tabActiveLI.each(function(index, element) {
						var $element = $(element),
							$tabMenu = $element.parents('.tab_menu'),
							outerHeight = $element.children('.tab_content').outerHeight() || '',
							unlock = $tabMenu.data('unlock') || '',
							unlockCount = 1;

						if(unlock) {
							unlock = unlock.split(',');
							unlockCount = unlock.length;
						}

						for(var i = 0; i < unlockCount; i++) {
							if($.inArray(unlock[i], event.settings.nowState) > -1) {
								$tabMenu.css('padding-bottom', '');
								break;
							}else{
								$tabMenu.css('padding-bottom', outerHeight);
							}
						}
					});
				});

				//해쉬이동
				$.tag.htmlAndBody = $.tag.html.add($.tag.body);
				$.tag.anchor = $('[href^="#"]').filter('a, area');
				$.tag.anchor.on('click.layout', function(event) {
					var $this = $(this),
						hash = this.hash,
						data = $this.data(),
						$hash = $(hash);

					//예외가 아닐 때
					if(!data.hasOwnProperty('exception')) {
						//해쉬 요소가 있고 애니메이션이 끝났을때
						if($hash.length && !$.tag.htmlAndBody.is(':animated')) {
							var hasTabindex = $hash.attr('tabindex'),
								offset = $hash.offset(),
								counter = 0;

							$.tag.htmlAndBody.animate({
								scrollTop : offset.top,
								scrollLeft : offset.left
							}, {
								duration : data.duration || 250,
								easing : data.easing || 'easeInOutExpo',
								complete : function() {
									//1이상일때
									if(!counter) {
										//tabindex 속성을 가지고있지 않을때
										if(!hasTabindex) {
											$hash.attr('tabindex', -1);
										}

										$hash.focus();

										if(!hasTabindex) {
											$hash.removeAttr('tabindex');
										}

										window.location.hash = hash;
										counter++;
									}

									//함수일때
									if(typeof data.complete === 'function') {
										data.complete();
									}
								}
							});
						}

						event.preventDefault();
					}
				});

				$('a[target="_blank"]').attr('rel', 'noopener noreferrer');
			});
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}