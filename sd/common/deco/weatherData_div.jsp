<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!-- <script src="/common/js/jquery-1.12.4.min.js"></script> -->
<script>
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

					$('#weather_div').addClass('weather'+icon_img);
					$('#weather_icon').attr('title', status);
					$('#weather_icon').text(status);
					$("#weather_temperature_num").html(Math.floor(temperature*10)/10);	//기온
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
			console.log(data);

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
					$('#air_dust1_status').text(status1);
					$('#air_dust1_value').text(pm10Value+"㎍/㎥");
				}

				/*
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

				if(status2_class != "") {
					$('#air_dust2').addClass(status2_class);
					$('#air_dust2').text(status2);
					//"("+pm25Value+"㎍/㎥)";
				}
				*/
			}
		}
	});
};

$(document).ready(function(){
	wheatherBanner();
});
</script>

<div id="weather_div" class="weather">
	<div id="weather_icon" class="icon">-</div>
	<div class="textbox clearfix">
		<p class="temperature"><strong id="weather_temperature_num">준비</strong><span>℃</span></p>
		<p class="dust">미세먼지 <span id="air_dust1_value">준비</span> <em id="air_dust1_status">준비</em></p>
	</div>
	<button type="button" class="info_btn" title="설명보기">설명보기</button>
	<div class="layer">
		<div class="inner">
			<p>현지 사정이나 수신 상태에 의해 차이가 발생 할 수 있습니다. <br />제공(환경부/한국환경공단)</p>
		</div>
	</div>
</div><!-- //.weather -->