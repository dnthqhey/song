(function ($) {
	'use strict';

	$(function () {

		var $window = element.$window = $(window),
			$container = element.$container = $('#container');

		/* 탭메뉴 */
		var $tabs = $container.find('.tabs'),
			$tabButton = $tabs.find('.tab_button');

		$tabButton.on('click', function () {
			if ($(this).parent().hasClass('button_box')) {
				$(this).parents('.board_item').addClass('active').siblings().removeClass('active');
			} else {
				$(this).parent().addClass('active').siblings().removeClass('active');
			}
		});

		var $rowgroup =  $('.rowgroup4'),
			$rowgroupChild =  $('.rowgroup4 .service .service_item.n1');

		$tabButton.on('click', function () {
			if ($rowgroupChild.hasClass('active')) {
				$rowgroup.addClass('n1_active');
			} else {
				$rowgroup.removeClass('n1_active');
			}
		});

		/* 비주얼 */
		var $visual = $container.find('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualCurrent = $visual.find('.visual_current'),
			$visualTotal = $visual.find('.visual_total'),
			$visualAuto = $visual.find('.visual_auto'),
			$visualPrev = $visual.find('.visual_prev'),
			$visualNext = $visual.find('.visual_next');

		var time = 5;
		var $bar,
			$slick,
			isPause,
			tick,
			percentTime;
		$bar = $('.visual .visual_control .progress_bar span');

		$visualList.slick({
			slidesToShow: 1,
			current     : $visualCurrent,
			total       : $visualTotal,
			prevArrow   : $visualPrev,
			nextArrow   : $visualNext,
		});

		$visualAuto.on('click', function () {
			if ($(this).hasClass('slick-play')) {
				isPause = false;
				$(this).removeClass('slick-play');
				$(this).text('정지');
			} else {
				isPause = true;
				$(this).addClass('slick-play');
				$(this).text('재생');
			}
		});
		// 팝업 멈추려면 여기부터 주석처리
		function startProgressbar() {
			resetProgressbar();
			percentTime = 0;
			isPause = false;
			tick = setInterval(interval, 10);
		}

		function interval() {
			if (isPause === false) {
				percentTime += 1 / (time + 0.1);
				$bar.css({
					width: percentTime + "%"
				});
				if (percentTime >= 100) {
					$visualList.slick('slickNext');
					startProgressbar();
				}
			}
		}

		function resetProgressbar() {
			$bar.css({
				width: 0 + '%'
			});
			clearTimeout(tick);
		}

		startProgressbar();

		$visualList.on('beforeChange', function (event, currentSlide, nextSlide) {
			if(!$('.visual_auto').hasClass('slick-play')){
				startProgressbar();
			}
		});
		// 팝업 멈추려면 여기까지 주석처리

		/* 자주찾는 메뉴 */
		var $favorite = $container.find('.favorite'),
			$favoriteList = $favorite.find('.favorite_list'),
			$favoriteItem = $favorite.find('.favorite_item'),
			$favoritePrev = $favorite.find('.favorite_prev'),
			$favoriteNext = $favorite.find('.favorite_next');

		$favoriteList.slick({
			slidesToShow: 9,
			slidesToScroll: 3,
			autoplay    : false,
			prevArrow   : $favoritePrev,
			nextArrow   : $favoriteNext,
			dots:false,
			responsive  : [
				{
					breakpoint: 1300,
					settings  : {
						slidesToShow: 7
					}
				},
				{
					breakpoint: 1000,
					settings  : {
						slidesToShow: 5
					}
				},
				{
					breakpoint: 640,
					settings  : {
						slidesToShow  : 3,
						slidesToScroll: 3,
						dots          : true,
						customPaging  : function (slider, i) {
							return '<span class="favorite_current">' + (i + 1) + '</span>' + '/' + Math.ceil(slider.slideCount / 3);
						}
					}
				}
			]
		});

		/* 알림존 */
		var $popupzone = $container.find('.popupzone'),
			$popupzoneList = $popupzone.find('.popupzone_list'),
			$popupzoneCurrent = $popupzone.find('.popupzone_current'),
			$popupzoneTotal = $popupzone.find('.popupzone_total'),
			$popupzoneAuto = $popupzone.find('.popupzone_auto'),
			$popupzonePrev = $popupzone.find('.popupzone_prev'),
			$popupzoneNext = $popupzone.find('.popupzone_next');

		$popupzoneList.slick({
			slidesToShow: 2,
			autoplay    : true,
			current     : $popupzoneCurrent,
			total       : $popupzoneTotal,
			playText    : '재생',
			pauseText   : '정지',
			autoArrow   : $popupzoneAuto,
			prevArrow   : $popupzonePrev,
			nextArrow   : $popupzoneNext,
			responsive:[
				{
					breakpoint: 641,
					settings : {
						slidesToShow:1,
						variableWidth:true
					}
				}
			]
		});

		/* 서비스 */
		var $service = $container.find('.service'),
			$serviceOpen = $service.find('.service_open');

		//$service.addClass('white');
		$serviceOpen.click(function () {
			if ($(this).parent().hasClass('n5')) {
				$service.addClass('white');
			} else {
				$service.removeClass('white')
			}
			$educationList.slick('setPosition')
			$welfareList.slick('setPosition')
			$jobList.slick('setPosition')
			$cultureList.slick('setPosition')
			$trafficList.slick('setPosition')
		});

		/* 서비스 - 교육 기관별 */
		var $education = $service.find('.education'),
			$educationList = $education.find('.combined_list'),
			$educationPrev = $education.find('.combined_prev'),
			$educationNext = $education.find('.combined_next'),
			$slickOpts = {
				slidesToShow: 3,
				autoplay    : false,
				infinite    : false,
				responsive  : [
					{
						breakpoint: 800,
						settings  : {
							slidesToShow  : 4,
							slidesToScroll: 4,
							dots          : true,
							customPaging  : function (slider, i) {
								return '<span class="current">' + (i + 1) + '</span>' + '/' + '<span class="total">' + Math.ceil(slider.slideCount / 4) + '</span>';
							}
						}
					}
				]
			};

		$window.on('screen', function () {
			if ($(window).width() < 800) {
				$educationList.slick($.extend($slickOpts, {
					prevArrow: $educationPrev,
					nextArrow: $educationNext
				}))
					.on("beforeChange", function (e, slick, current, next) {
						if (next >= (slick.slideCount - slick.options.slidesToShow)) {
							$educationList.addClass("end");
						} else {
							$educationList.removeClass("end");
						}
					});
			} else {
				$educationList.slick('unslick');
			}
		});


		/* 서비스 - 교육 생애주기별 */
		var $lifecycle = $service.find('.lifecycle'),
			$lifecycleList = $lifecycle.find('.combined_list'),
			$lifecyclePrev = $lifecycle.find('.combined_prev'),
			$lifecycleNext = $lifecycle.find('.combined_next'),
			$slickOpts = {
				slidesToShow: 3,
				autoplay    : false,
				infinite    : false,
				responsive  : [
					{
						breakpoint: 800,
						settings  : {
							slidesToShow  : 4,
							slidesToScroll: 4,
							dots          : true,
							customPaging  : function (slider, i) {
								return '<span class="current">' + (i + 1) + '</span>' + '/' + '<span class="total">' + Math.ceil(slider.slideCount / 4) + '</span>';
							}
						}
					}
				]
			};

		$window.on('screen', function () {
			if ($(window).width() < 800) {
				$lifecycleList.slick($.extend($slickOpts, {
					prevArrow: $lifecyclePrev,
					nextArrow: $lifecycleNext
				}))
					.on("beforeChange", function (e, slick, current, next) {
						if (next >= (slick.slideCount - slick.options.slidesToShow)) {
							$lifecycleList.addClass("end");
						} else {
							$lifecycleList.removeClass("end");
						}
					});
			} else {
				$lifecycleList.slick('unslick');
			}
		});




		/* 서비스 - 교육 분야별 */
		var $field = $service.find('.field'),
			$fieldList = $field.find('.combined_list'),
			$fieldPrev = $field.find('.combined_prev'),
			$fieldNext = $field.find('.combined_next'),
			$slickOpts = {
				slidesToShow: 3,
				autoplay    : false,
				infinite    : false,
				responsive  : [
					{
						breakpoint: 800,
						settings  : {
							slidesToShow  : 4,
							slidesToScroll: 4,
							dots          : true,
							customPaging  : function (slider, i) {
								return '<span class="current">' + (i + 1) + '</span>' + '/' + '<span class="total">' + Math.ceil(slider.slideCount / 4) + '</span>';
							}
						}
					}
				]
			};

		$window.on('screen', function () {
			if ($(window).width() < 800) {
				$fieldList.slick($.extend($slickOpts, {
					prevArrow: $fieldPrev,
					nextArrow: $fieldNext
				}))
					.on("beforeChange", function (e, slick, current, next) {
						if (next >= (slick.slideCount - slick.options.slidesToShow)) {
							$fieldList.addClass("end");
						} else {
							$fieldList.removeClass("end");
						}
					});
			} else {
				$fieldList.slick('unslick');
			}
		});

		/* 서비스 - 안전/복지 */
		var $welfare = $container.find('.welfare'),
			$welfareList = $welfare.find('.welfare_list'),
			$welfarePrev = $welfare.find('.welfare_prev'),
			$welfareNext = $welfare.find('.welfare_next');

		$welfareList.slick({
			slidesToShow: 4,
			autoplay    : false,
			infinite    : false,
			prevArrow   : $welfarePrev,
			nextArrow   : $welfareNext,
			responsive  : [
				{
					breakpoint: 1300,
					settings  : {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 800,
					settings  : {
						slidesToShow  : 2,
						slidesToScroll: 2,
						dots          : true,
						customPaging  : function (slider, i) {
							return '<span class="current">' + (i + 1) + '</span>' + '/' + '<span class="total">' + Math.ceil(slider.slideCount / 2) + '</span>';
						}
					}
				}
			]
		});

		/* 서비스 - 청년/일자리 */
		var $job = $container.find('.job'),
			$jobList = $job.find('.job_list'),
			$jobPrev = $job.find('.job_prev'),
			$jobNext = $job.find('.job_next');

		$window.on('screen', function () {
			//if ($(window).width() < 1300) {
			$jobList.slick({
				slidesToShow: 5,
				autoplay    : false,
				infinite    : false,
				prevArrow   : $jobPrev,
				nextArrow   : $jobNext,
				variableWidth: true,
				responsive  : [
					{
						breakpoint: 1300,
						settings  : {
							slidesToShow: 4,
							variableWidth: false
						}
					},
					{
						breakpoint: 1000,
						settings  : {
							slidesToShow: 3,
							variableWidth: false
						}
					},
					{
						breakpoint: 800,
						settings  : {
							slidesToShow: 2,
							variableWidth: false
						}
					},
					{
						breakpoint: 640,
						settings  : {
							infinite      : false,
							centerMode    : false,
							slidesToShow  : 2,
							slidesToScroll: 2,
							dots          : true,
							variableWidth: false,
							customPaging  : function (slider, i) {
								return '<span class="current">' + (i + 1) + '</span>' + '/' + '<span class="total">' + Math.ceil(slider.slideCount / 2) + '</span>';
							}
						}
					}
				]
			});
			/*} else {
				$jobList.slick('unslick');
			}*/
		});

		/* 서비스 - 문화/환경 */
		var $culture = $container.find('.culture'),
			$cultureList = $culture.find('.culture_list'),
			$culturePrev = $culture.find('.culture_prev'),
			$cultureNext = $culture.find('.culture_next');

		$window.on('screen', function () {
			if ($(window).width() < 1300) {
				$cultureList.slick({
					slidesToShow: 4,
					autoplay    : false,
					infinite    : false,
					prevArrow   : $culturePrev,
					nextArrow   : $cultureNext,
					responsive  : [
						{
							breakpoint: 800,
							settings  : {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 640,
							settings  : {
								slidesToShow  : 2,
								slidesToScroll: 2,
								dots          : true,
								customPaging  : function (slider, i) {
									return '<span class="current">' + (i + 1) + '</span>' + '/' + '<span class="total">' + Math.ceil(slider.slideCount / 2) + '</span>';
								}
							}
						}
					]
				});
			} else {
				$cultureList.slick('unslick');
			}
		});

		/* 서비스 - 경제/교통 */
		var $traffic = $container.find('.traffic'),
			$trafficList = $traffic.find('.combined_list'),
			$trafficPrev = $traffic.find('.combined_prev'),
			$trafficNext = $traffic.find('.combined_next');

		$window.on('screen', function () {
			if ($(window).width() < 800) {
				$trafficList.slick($.extend($slickOpts, {
					prevArrow: $trafficPrev,
					nextArrow: $trafficNext,
				}))
					.on("beforeChange", function (e, slick, current, next) {
						if (next >= (slick.slideCount - slick.options.slidesToShow)) {
							$trafficList.addClass("end");
						} else {
							$trafficList.removeClass("end");
						}
					});
			} else {
				$trafficList.slick('unslick');
			}
		});

		/* slick tabindex 관련수정 */
		var $slideSlide = $container.find('.slick-slide');

		$slideSlide.each(function(){
			if($(this).children('a').length){
				$(this).attr("tabindex",-1);
			}
		});

		/* 스크롤힌트 */
		$('.scroll_hint').on('touchstart', function () {
			$(this).children('.mobile_scroll_hint').hide();
		});

	});
})(window.jQuery);