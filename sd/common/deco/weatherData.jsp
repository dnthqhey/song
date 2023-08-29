<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!-- <script src="/common/js/jquery-1.12.4.min.js"></script> -->
<script>
var AutoPlay = false,
	SlickInitialSlide = 0;
function wheatherBanner(){
	//기상정보 - 기온
	$.ajax({
		url:'/weatherDataJSON.do',
		type: 'POST',
		dataType: 'json',
		success: function(resp) {
			console.log(resp);

			if(resp.response.header.resultCode == "00") {
				var data = resp.response.body.items.item;

				if(data.length > 0){
					var temperature = "점검중";	//기온
					var pty_status = 0;
					var sky_status = 0;
					var lgt_status = 0;
					icon_img = "10";
					var status = "";

					var tmp_set = false;
					var pty_set = false;
					var sky_set = false;
					var lgt_set = false;


					for(var i=0;i<data.length;i++){
						//기온
						if(!tmp_set && data[i].category == "T1H"){
							baseDate = data[i].baseDate;
							baseTime = data[i].baseTime;
							temperature = data[i].fcstValue;
							tmp_set = true;
						}

						//강수상태
						if(!pty_set && data[i].category == "PTY"){
							pty_status = data[i].fcstValue;
							pty_set = true;
						}

						//하늘상태
						if(!sky_set && data[i].category == "SKY"){
							sky_status = data[i].fcstValue;
							sky_set = true;
						}

						//낙뢰상태
						if(!lgt_set && data[i].category == "LGT"){
							lgt_status = data[i].fcstValue;
							lgt_set = true;
						}
					}

					if(lgt_status == "0"){
						if(pty_status == "0"){
							if(sky_status >= 0 && sky_status <= 2){
								icon_img = "1";
								status = "맑음";
							}else if(sky_status >= 3 && sky_status <= 5){
								icon_img = "2";
								status = "구름조금";
							}else if(sky_status >= 6 && sky_status <= 8){
								icon_img = "3";
								status = "구름많음";
							}else if(dsky_status >= 9 && sky_status <= 10){
								icon_img = "4";
								status = "흐림";
							}
						}else if(pty_status == "1"){
							icon_img = "5";
							status = "비";
						}else if(pty_status == "2"){
							icon_img = "6";
							status = "비/눈";
						}else if(pty_status == "3"){
							icon_img = "7";
							status = "눈";
						}
					}else{
						icon_img = "8";
						status = "낙뢰";
					}

					console.log("status = " + status + ", temperature = " + temperature);

					$("#weather_temperature_num").html(Math.floor(temperature*10)/10+"˚C");	//기온
					//$(".WEATHER_ICON").attr("src", "/images/common/wheather_banner/icon/"+icon_img);	//상태 이미지
					//$(".WEATHER_ICON").attr("alt", status);					//상태값
				}
			}
		}
	});

	//기상정보-통합대기지수
	$.ajax({
		url:'/airQualityJSON.do',
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			if (data.length > 0) {
				// 통합대기환경지수 기본값은 "점검중"으로 설정함
				var status1 = "점검중";
				var status1_class = "";
				var pm10Value = data[0].pm10Value;		// 미세먼지수치
				var pm10Grade = data[0].pm10Grade;		// 미세먼지등급

				// 미세먼지등급
				// 1:좋음, 2:보통, 3:나쁨, 4:매우나쁨
				if (pm10Grade == '1') {
					status1_class = "good";
					status1 = "좋음";
				} else if (pm10Grade == '2') {
					status1_class = "normal";
					status1 = "보통";
				} else if (pm10Grade == '3') {
					status1_class="bad";
					status1 = "나쁨";
				} else if (pm10Grade == '4') {
					status1_class="very_bad";
					status1 = "매우나쁨";
				}

				if(status1_class != "") {
					$('#air_dust1').addClass(status1_class);
					$('#air_dust1').text(status1);
					//"("+pm10Value+"㎍/㎥)";
				}

				var status2 = "점검중";
				var status2_class = "";
				var pm25Value = data[0].pm25Value;		// 초미세먼지수치
				var pm25Grade = data[0].pm25Grade;		// 초미세먼지등급
				if (pm25Grade == '1') {
					status2_class = "good";
					status2 = "좋음";
				} else if (pm25Grade == '2') {
					status2_class = "normal";
					status2 = "보통";
				} else if (pm25Grade == '3') {
					status2_class="bad";
					status2 = "나쁨";
				} else if (pm25Grade == '4') {
					status2_class="very_bad";
					status2 = "매우나쁨";
				}

				//console.log("pm25Grade=" + pm25Grade + ", s2c=" + status2_class + ", s2=" + status2);

				if(status2_class != "") {
					$('#air_dust2').addClass(status2_class);
					$('#air_dust2').text(status2);
					//"("+pm25Value+"㎍/㎥)";
				}
			}
		}
	});


	//기상특보
	$.ajax({
		url:'/specialNewsCodeDataJSON.do',
		type: 'POST',
		dataType: 'json',
		success: function(resp) {
			//console.log(resp);

			if(resp.response.header.resultCode == "00") {
				var data = resp.response.body.items.item;
				//console.log(data);
				if(data.length > 0 ){
					var lastNews = data[0];
					//console.log(lastNews);
					if(lastNews.t1) {

						// 발표시각 ------------------------------------------------------------
						var tmFc = lastNews.t5; // 발표시각(년월일시분)
						var tmFcYear = tmFc.substring(0,4);
						var tmFcMon = tmFc.substring(4,6);
						var tmFcDay = tmFc.substring(6,8);
						var tmFcHour = tmFc.substring(8,10);
						var tmFcMin = tmFc.substring(10,12);
						var tmFcNm = tmFcYear+"."+tmFcMon+"."+tmFcDay+" "+tmFcHour+":"+tmFcMin;
						var specialNews = lastNews.t1 + "(" + tmFcNm + ")";

						//console.log(specialNews);

						var warnVar = "";

						if(lastNews.t1.indexOf('강풍') != -1) { warnVar = "1";}
						else if(lastNews.t1.indexOf('호우') != -1) { warnVar = "2";}
						else if(lastNews.t1.indexOf('한파') != -1) { warnVar = "3";}
						else if(lastNews.t1.indexOf('건조') != -1) { warnVar = "4";}
						else if(lastNews.t1.indexOf('폭풍해일') != -1) { warnVar = "5";}
						else if(lastNews.t1.indexOf('풍랑') != -1) { warnVar = "6";}
						else if(lastNews.t1.indexOf('태풍') != -1) { warnVar = "7";}
						else if(lastNews.t1.indexOf('대설') != -1) { warnVar = "8";}
						else if(lastNews.t1.indexOf('황사') != -1) { warnVar = "9";}
						else if(lastNews.t1.indexOf('폭염') != -1) { warnVar = "12";}

						var warnStress = "";
						if(lastNews.t1.indexOf('주의보') != -1) { warnStress = "0";}
						else if(lastNews.t1.indexOf('경보') != -1) { warnStress = "1";}



						if(warnStress == '0') {
							$('#special_news_icon').addClass('caution');
						}
						else if(warnStress == '1') {
							$('#special_news_icon').addClass('warning');
						}

						if(warnVar != "") {
							$('#special_news_icon').addClass('bulletin1'+warnVar);
						}

						$('#special_news_txt1_i').text(lastNews.t1);
						$('#special_news_txt1_s').text(lastNews.t1);
						$('#special_news_txt5').text(tmFcNm);

						AutoPlay = true;
						SlickInitialSlide = 1;
					}
				}
			}
		}
	});
};

$(document).ready(function(){
	wheatherBanner();
	$(document).ajaxComplete(function() {
		setTimeout(function(){
			//weather
			var $weatherSlick = $('.weather .weather_list');
			$weatherSlick.slick({
				autoplay : AutoPlay,
				autoplaySpeed: 3000,
				dots:false,
				fade: false,
				pauseOnHover: true,
				initialSlide: SlickInitialSlide,
				arrows: false,
				swipe:false,
				draggable:false,
				slidesToShow: 1,
				slidesToScroll: 1,
				variableWidth:false
			});
		}, 10);
	});
});
</script>
<section class="weather">
	<h2 class="skip">성동구 날씨</h2>
	<div class="weather_list">
		<div class="weather_item weatherdata">
			<div class="top">
				<div id="weather_temperature_num" class="temperature_num">-</div>
				<div class="temperature_text">성동구</div>
			</div>
			<div class="bottom">
				<div class="dust1"><span class="title">미세먼지</span><span  id="air_dust1" class="text"></span></div>
				<div class="dust2"><span class="title">초미세먼지</span><span id="air_dust2" class="text"></span></div>
			</div>
		</div>

		<div id="special_news_icon" class="weather_item bulletin"><!-- 주의보:caution, 경보:warning / 강풍:bulletin1, 호우:bulletin2, 한파:bulletin3, 건조:bulletin4, 폭풍해일:bulletin5, 풍랑:bulletin6, 태풍:bulletin7, 대설:bulletin8, 황사:bulletin9, 폭염:bulletin12 -->
			<div class="conbox">
				<div class="databox clearfix">
					<div class="icon" id="special_news_txt1_i">-</div>
					<div class="text"><span id="special_news_txt1_s">-</span></div>
				</div>
			</div>
			<div class="datebox"><em>발효시각</em> <span id="special_news_txt5">-</span></div>
		</div>
	</div>
</section>