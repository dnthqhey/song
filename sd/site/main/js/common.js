(function($) {
	'use strict';

	$(function() {

		var $window = element.$window = $(window),
			$html = element.$html = $('html'),
			$header = element.$header = $('#header');

		/*
		$window.on('screen', function(event) {
			search.activeRefresh();
		});
*/
		/* 메뉴 */
		var $lnb = $header.find('.lnb'),
			$depthList = $lnb.find('.depth_list');

		$depthList.each(function(index, element){
			var $element = $(element);
			$element.find('> li').each(function(index, element){
				var $element = $(element);
				$element.addClass('n' + (index + 1));
			});
		});

		/* 검색 */
		var search = (function(){
			var $search = $header.find('.search'),
				$searchOpen = $search.find('.search_open'),
				$searchClose = $search.find('.search_close'),
				$searchQuery = $search.find('.search_query');

			$searchOpen.on('click', function(event) {
				$search.toggleClass('active');
			});
			$searchClose.on('click', function(event) {
				$search.removeClass('active');
			});

			//보고회용 임시 > 검색버튼 기능 막음
			/*
			$('.search_submit').on('click', function(event) {
				alert('준비중입니다.');
				event.preventDefault();
			});
		
			 */

			$searchQuery.focus(function(){
				$(this).closest('.search_form').addClass('active');
				$(this).closest('.home').addClass('focus');
			}).blur(function(){
				var $this = $(this);
				if($this.val()){
					$this.closest('.search_form').addClass('active');
				}else{
					$this.closest('.search_form').removeClass('active');
					$(this).closest('.home').removeClass('focus');
				}
			});

			/*
			$searchQuery.on('keyup', function() {
				var $this = $(this);

				if($this.val()){
					$this.closest('.search_form').addClass('active');
				}else{
					$this.closest('.search_form').removeClass('active');
				}
			});
			*/


			function activeRefresh(){
				$search.removeClass('active');
			}

			return{
				activeRefresh: activeRefresh
			}
		})();

		/* hot인기검색어 */
		var $popular = $header.find('.popular'),
			$popularList = $popular.find('.popular_list'),
			/*$popularAnchor = $popular.find('.popular_anchor'),*/
			$popularButton = $popular.find('.popular_button'),
			popularSlickOption = {
				draggable : false,
				swipe : false,
				touchMove : false,
				infinite: true,
				vertical: true,
				slidesToShow: 1,
				speed : 500,
				autoplay: true,
			};

		$popularList.slick(popularSlickOption);

		$popularList.on('afterChange', function(event, slick, currentSlide, nextSlide){
			$('.popular .slick-slide').removeClass('active');
			$('.popular .slick-active').addClass('active');
		});

		$popularButton.addClass('open');
		$popularButton.on('click', function(event) {
			if($(this).hasClass('open')){
				event.preventDefault();
				$popularList.slick('unslick');
				$popular.addClass('stop');
				$(this).addClass('close').removeClass('open').text('닫기');
			}else{
				$popular.removeClass('stop');
				//$popularList.slick('refresh');
				$popularList.slick(popularSlickOption);
				$(this).addClass('open').removeClass('close').text('열기');
			}
		});

		/* cookie */
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}

		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

		/* 이슈 팝업 */
		var $issue = $header.find('.issue'),
			$issueList = $issue.find('.issue_list'),
			$issueBtn = $issue.find('.issue_btn'),
			$issueAuto =  $issue.find('.issue_auto'),
			$issueControl = $('.issue_control .issue_dot'),
			issueSlickOption = {
				slidesToShow: 1,
				autoplay: true,
				dots: true,
				appendDots: $issueControl,
				playText: '재생',
				pauseText: '정지',
				autoArrow: $issueAuto
			};

		$window.on('load', function(event) {
			$issueList.on('init', function(event, slick) {
				//쿠기 체크
				if(~document.cookie.indexOf("close=Y")){
					//close
					$html.removeClass('issue_show');
					/*$html.removeClass('covid_show');*/
				}else{
					$html.addClass('issue_show');
					/*$html.addClass('covid_show');*/
				}
			}).slick(issueSlickOption);
		});

		$issueBtn.on('click', function () {
			if($("#input_today").is(":checked")) {
				setCookie("close","Y",1);
			}
			$html.removeClass('issue_show');
			$issue.delay().fadeOut();
		});

		 /*코로나 상단 팝업*/
		$('.covid_head .close_area .issue_btn').on('click', function () {
			if($("#input_today_covid").is(":checked")) {
				setCookie("covid_close","Y",1);
				console.log('check');
			}
			$html.removeClass('covid_show');
			$('.covid_head').delay().fadeOut();
		});

		/* 기념일 로고 */
		 $(document).ready(function () {
            var today = new Date(),
                day = today.getDate(),
                month = today.getMonth() + 1;
            var newYear = '0101', // 새해
                newYear2 = '0212', // 설날
                samil = '0301', //삼일절
                child = '0505', //어린이날
                buddha = '0519', //부처님 오신날
                memorial = '0606', //현충일
                liberation = '0815', //광복절
                thanksgiving = '0921', //추석
                gaecheon = '1003', //개천절
                hangul = '1009', //한글날
                christmas = '1225'; //크리스마스

            var t2 = ("0" + month).slice(-2) + ("0" + day).slice(-2); //오늘 날짜 형식변환
            switch (t2) {
                case newYear :
                    $('html').addClass('newYear');
                    break;
                case newYear2 :
                    $('html').addClass('newYear2');
                    break;
                case samil :
                    $('html').addClass('samil');
                    break;
                case child :
                    $('html').addClass('child');
                    break;
                case buddha :
                    $('html').addClass('buddha');
                    break;
                case memorial :
                    $('html').addClass('memorial');
                    break;
                case liberation :
                    $('html').addClass('liberation');
                    break;
                case thanksgiving :
                    $('html').addClass('thanksgiving');
                    break;
                case gaecheon :
                    $('html').addClass('gaecheon');
                    break;
                case hangul :
                    $('html').addClass('hangul');
                    break;
                case christmas :
                    $('html').addClass('christmas');
                    break;
            }
        });

	});
})(window.jQuery);