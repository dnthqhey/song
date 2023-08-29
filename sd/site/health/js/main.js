(function($) {
	'use strict';

	$(function() {
		var	$window = element.$window = $(window),
			$html = element.$html = $('html'),
			$container = element.$container = $('#container');

		/* 메인 비쥬얼 슬라이드
		var $visual = $container.find('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualItem = $visual.find('.visual_item'),
			$visualControl = $visual.find('.visual_control'),
			$visualAuto = $visual.find('.visual_auto'),
			$visualDots = $visual.find('.visual_dots');

		if ($visualItem.length < 2){
			$visualControl.hide();
		}
		$visualList.slick({
			arrows:true,
			dots: true,
			appendDots: $visualDots,
			autoplay: true,
			autoArrow: $visualAuto
		});
		
		 */



		/* 비지니스 슬라이드 */
		var $business = $container.find('.business'),
			$businessList = $business.find('.business_list'),
			$businessPrev =  $business.find('.business_prev'),
			$businessNext =  $business.find('.business_next');

		$businessList.slick({
			slidesToShow: 9,
			arrows:true,
			infinite:false,
			variableWidth: true,
			prevArrow:$businessPrev,
			nextArrow:$businessNext,
			responsive:[
				{
				breakpoint:1301,
				settings:{
					slidesToShow: 7,
					}
				},
				{
					breakpoint:1001,
					settings:{
						slidesToShow: 5,
						variableWidth: true
					}
				},
				{
					breakpoint:641,
					settings:{
						slidesToShow: 3,
						arrows:true,
						variableWidth: false
					}
				},
			]
		});

		/* 공지사항, 보건뉴스 탭 게시판 */
		var $board = $container.find('.board_list'),
			$boardItem = $board.find('.board_item'),
			$boardTab = $board.find('.board_title');

		$boardTab.click(function (event) {
			event.preventDefault();
			var $this = $(this);
			$boardItem.removeClass('active');
			$this.closest($boardItem).addClass('active');
		});

		/* 성동보건 민원 슬라이드 */
		var $service = $container.find('.service'),
			$serviceList = $service.find('.service_list'),
			$serviceCurrent = $service.find('.service_current'),
			$serviceTotal = $service.find('.service_total'),
			$servicePrev = $service.find('.service_prev'),
			$serviceNext = $service.find('.service_next');

		$serviceList.slick({
			rows:4,
			dots:true,
			total: $serviceTotal,
			current: $serviceCurrent,
			prevArrow:$servicePrev,
			nextArrow:$serviceNext,
			responsive:[
				{
					breakpoint:1001,
					settings:{
						 rows:3,
					}
				}
			]
		});

		var $slideZone = $container.find('.slidezone'),
			$slideList = $slideZone.find('.slidezone_list'),
			$slideZoneCurrent = $slideZone.find('.slidezone_current'),
			$slideZoneTotal = $slideZone.find('.slidezone_total'),
			$slideZonePrev = $slideZone.find('.slidezone_prev'),
			$slideZoneNext = $slideZone.find('.slidezone_next'),
			$slideZoneAuto = $slideZone.find('.slidezone_auto');

		$slideList.slick({
			infinite:true,
			autoplay: false,
			autoArrow: $slideZoneAuto,
			total: $slideZoneTotal,
			current: $slideZoneCurrent,
			prevArrow:$slideZonePrev,
			nextArrow:$slideZoneNext,
		});

		/* 알림존 */
		var $popupzone = $container.find('.popupzone'),
			$popupzoneList = $popupzone.find('.popupzone_list'),
			$popupzoneCurrent = $popupzone.find('.popupzone_current'),
			$popupzoneTotal =  $popupzone.find('.popupzone_total'),
			$popupzoneAuto =  $popupzone.find('.popupzone_auto'),
			$popupzonePrev =  $popupzone.find('.popupzone_prev'),
			$popupzoneNext =  $popupzone.find('.popupzone_next');

		$popupzoneList.slick({
			slidesToShow: 1,
			autoplay: true,
			current: $popupzoneCurrent,
			total: $popupzoneTotal,
			playText: '재생',
			pauseText: '정지',
			autoArrow: $popupzoneAuto,
			prevArrow: $popupzonePrev,
			nextArrow: $popupzoneNext
		});


	});
})(window.jQuery);