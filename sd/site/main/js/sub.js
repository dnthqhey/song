function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * @author (주)한신정보기술 퍼블리셔팀 000
 * @since 2020-00-00
 * @version 1.0.0
 */
(function($) {
	'use strict';
	/* 부서서브(별도) 전체보기 */
	$(function() {
		$('.depart_btn').on("click", function () {
			var $parent = $(this).parent(),
				$parentActive = $parent.is('.active');

			if(!$parentActive){
				$parent.addClass('active');
			} else{
				$parent.removeClass('active');
			};
		});

		/* 접근성 - .skip 에 초점 이동되는 건 */
		$('.skip').attr('tabindex', '-1');
		
		//게시판대체텍스트 2023-03-14 서정한
		var nttNo = getParameterByName('nttNo'),
			PhotoViewLength = $('.p-table__content').find('.p-photo').length;
		if(PhotoViewLength){
			$('.p-table__content').find('.p-photo').each(function(){
				var $this = $(this),
					imagename = $this.attr('data-imagename'),
					FileName = imagename.split('.')[0];
				$.ajax({
					url : '/site/main/bbsalt/'+FileName+'.html',
					success : function (data) {
						var Iserror = $(data).find('.item').length;
						if(Iserror>0){
							var BbsAltLength = $('.p-table__content').find('.bbsalt').length;
							if(!BbsAltLength){
								$('.p-table__content').append('<div class="bbsalt skip"></div>');
							}
							$('.p-table__content').find('.bbsalt').append('<div class="headtitle">다음은 본문삽입이미지 대체텍스트입니다.</div>').append(data);
						}
					},
					error:function(request, status, error){
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				});
			});
		}
		//카드뉴스
		var CardLength = $('.pro_cardydp').length;
		if(CardLength){
			$.ajax({
				url : '/site/main/cardnewsalt/'+nttNo+'.html',
				success : function (data) {
					var Iserror = $(data).find('.item').length;
					if(Iserror>0){
						$('.pro_cardydp .card_news').after('<div class="bbsalt skip"></div>');
						$('.pro_cardydp').find('.bbsalt').append('<div class="headtitle">다음은 본문삽입이미지 대체텍스트입니다.</div>').append(data);
					}
				}
			});
		}

	});
})(window.jQuery);