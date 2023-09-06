$(function(){
	/*액티브 박스-공통*/
	$('.active_box button.active_btn').on('click', function() {
		var $this = $(this);
		if(!$this.hasClass('on')) {
			$this.parents('.active_box').addClass('active').find('.active_btn').attr('title','하위내용 축소').addClass('on');
		}else{
			$this.parents('.active_box').removeClass('active').find('.active_btn').attr('title','하위내용 확장').removeClass('on');
		}
	});
});

// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

$(document).ready(function(){
	//이미지 롤오버 
	 $('.overimg').mouseover(function (){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_off.','_on.'));
		
	 }).mouseout(function(){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
	 });
});


//날짜 지정 - 월간,주간,일간
function setDate(type) {
	var date = new Date();
	var endYear = date.getFullYear();
	var endMonth = date.getMonth()+1;
	var endDay = date.getDate();
	if(endMonth < 10){
		endMonth = '0'+endMonth;
	}
	if(endDay < 10){
		endDay = '0'+endDay;
	}
	var endDate = endYear+'-'+endMonth+'-'+endDay;
	
	if(type=='y'){
		date.setYear(parseInt(endYear)-1);
	}else if(type=='m'){
		date.setMonth(parseInt(endMonth)-2);
	}else if(type=='w'){
		date.setDate(parseInt(endDay)-7);
	}else if(type=='d'){
		date.setDate(parseInt(endDay)-1);
	}
	
	var startYear = date.getFullYear();
	var startMonth = date.getMonth()+1;
	var startDay = date.getDate();
	if(startMonth < 10){
		startMonth = '0'+startMonth;
	}
	if(startDay < 10){
		startDay = '0'+startDay;
	}
	
	var startDate = startYear+'-'+startMonth+'-'+startDay;
	$('.period_start').val(startDate);
	$('.period_end').val(endDate);
};


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

				//여기서부터 코드 작성해주세요
				$('.detail_search').on('click', function(){
					var $detailbox = $('.detailbox'),
						IsActive = $detailbox.is('.active');
					if(!IsActive){
						$detailbox.addClass('active').slideDown();
					} else{
						$detailbox.removeClass('active').slideUp();
					};
				});
				$('.detail_close').on('click', function(){
					var $detailbox = $('.detailbox'),
						$detailsearchbtn = $('.detail_search');
					$detailbox.removeClass('active').slideUp();
					$detailsearchbtn.focus();
				});

				$('.searchbox .detailbox .itembox .period_btn').on('click', function(){
					var $this = $(this),
						period = $this.attr('data-period'),
						IsActive = $this.is('.active');
					if(!IsActive){
						$this.addClass('active').siblings('.period_btn').removeClass('active');
						setDate(period);
					};
				});

				$('.searchbox .detailbox .listbox .itembox.range .temp_checkbox input[type="checkbox"]').on('click', function(){
					var $this = $(this),
						$MyParent = $this.parent('.temp_checkbox'),
						$OtherParents = $MyParent.siblings('.temp_checkbox'),
						$OtherCheckbox = $OtherParents.find('input[type="checkbox"]'),
						DATAAll = $this.attr('data-all'),
						AllBtn = $('.searchbox .detailbox .listbox .itembox.range').find('input[type="checkbox"][data-all="y"]'),
						IAmChecked = $this.is(':checked'),
						AllBtnIsChecked = AllBtn.is(':checked');
					if(DATAAll=='y'){
						if(AllBtnIsChecked){
							$OtherCheckbox.prop('checked', true);
						} else{
							$OtherCheckbox.prop('checked', false);
						};
					} else{
						if(AllBtnIsChecked){
							AllBtn.prop('checked', false);
						};
					};
				});

				$.tag.wdw.on('responsive.common', function(event) {

					if(event.state == 'wide' || event.state == 'web') {
						mode = 'pc';

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
