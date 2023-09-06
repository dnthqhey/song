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
				$.tag.contents = $('#contents');

				//만족도조사
				$.tag.satisfaction = $.tag.container.find('.satisfaction');
				$.tag.satisfactionSubmit = $.tag.satisfaction.find('input[type="submit"]');
				$.tag.satisfactionRadio = $.tag.satisfaction.find('input[type="radio"]');
				$.tag.satisfactionText = $.tag.satisfaction.find('#etc');

				$.tag.satisfactionSubmit.on('click.layoutSub', function(event) {
					var isPreventDefault = false;

					//라디오 버튼이 선택되지 않았을때
					if(!$.tag.satisfactionRadio.filter(':checked').length) {
						alert('만족도를 선택해 주세요.');
						isPreventDefault = true;
					
					//의견이 없을때
					}else if(!$.tag.satisfactionText.val().length) {
						alert('의견을 입력해주세요.');
						isPreventDefault = true;
					}

					if(isPreventDefault) {
						event.preventDefault();
					}
				});

				//탭메뉴버튼
				$.tag.tabTabletButton = $.tag.tabMenu.children('.tab_button');
				$.tag.tabTabletButton.on('click.layoutSub', function(event) {
					var $this = $(this);

					if(!$.tag.tabWrap.is(':animated')) {
						$this.next('.tab_wrap').slideToggle(250, 'easeInOutExpo');
						$this.parent('.tab_menu').toggleClass('active');
					}
				});
				
				$.tag.wdw.on('responsive.layoutSub', function(event) {
					//wide, web분기일때
					if(event.state === 'wide' || event.state === 'web') {
						$.tag.tabWrap.css('display', '');
					}
				});

				//반응형 표
				$.tag.contentsTable = $.tag.contents.find('.table');
				$.tag.responsiveTable = $.tag.contentsTable.filter('.type3');
				$.tag.responsiveTable.each(function(index, element) {
					var $element = $(element),
						$tr = $element.find('tbody tr, tfoot tr');

					$element.find('thead th').each(function(index, element) {
						var $element = $(element),
							text = $element.text();
						
						if(text) {
							text += ' : ';
						}

						$tr.each(function(idx, element) {
							var $element = $(element),
								$children = $element.children(':eq(' + index + ')');

							//부모가 tfoot의 th가 아닐때
							if(!$children.is('tfoot th')) {
								$children.attr('data-cell-header', text);
							}
						});
					});
				});
				
				//애드온
				$.tag.addons = $.tag.container.find('.addons');
				$.tag.printButton = $.tag.addons.find('.print_button');
				$.tag.share = $.tag.addons.find('.share');
				$.tag.shareOpenButton = $.tag.share.children('.share_open');
				$.tag.shareCloseButton = $.tag.share.find('.share_close');

				$.tag.printButton.on('click.layoutSub', function(event) {
					window.print();
				});

				$.tag.shareOpenButton.on('click.layoutSub', function(event) {
					$.tag.share.toggleClass('active');
				});

				$.tag.shareCloseButton.on('click.layoutSub', function(event) {
					$.tag.share.removeClass('active');
				});

				//슬라이드 템플릿
				$.tag.tempSlide = $.tag.contents.find('.temp_slide');
				$.tag.tempSlide.each(function(index, element) {
					var $element = $(element),
						$tempSlideControl = $element.children('.temp_slide_control');

					$element.children('.temp_slide_list').slick({
						draggable : false,
						swipe : false,
						touchMove : false,
						cssEase : 'cubic-bezier(1, 0, 0, 1)',
						speed : 250,
						fade : $element.hasClass('type3') || $element.hasClass('type4'),
						prevArrow : $tempSlideControl.children('.temp_slide_prev'),
						nextArrow : $tempSlideControl.children('.temp_slide_next'),
						adaptiveHeight : true,
						responsive : [{
							breakpoint : 1001,
							settings : {
								draggable : true,
								swipe : true,
								touchMove : true
							}
						}]
					});
				});
				
				//게시판 목록 가져오기
				window.getBbsNttList = function(selector, key, bbsNo, size) {
					$.ajax({
						url : '/common/deco/bbs_ntt_list_type1.jsp',
						data : {
							bbsMenuNo : key,
							bbsNo : bbsNo,
							nttSize : size
						},
						dataType : 'html',
						success : function(data) {
							$(selector).append(data);
						}
					});
				};
				
				//조직 목록 가져오기
				window.getDeptEmpList = function(selector, deptCode) {
					$.ajax({
						url : '/common/deco/dept_emp_list.jsp',
						data : 'dept_code=' + deptCode,
						dataType : 'html',
						success : function(data) {
							$(selector).append(data);
						}
					});
				};
			});
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}