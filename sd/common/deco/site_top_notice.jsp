<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.*" %>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="egovframework.com.cmm.LoginVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.mngTop.service.*" %>
<%
	WebApplicationContext wad = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	MngTopService mngTopService = (MngTopService)wad.getBean("mngTopService");
	
	MngTopVO mngTopVO = mngTopService.selectRecord();
	request.setAttribute("mngTopVO" , mngTopVO);       
%>
<script type="text/javascript">
    var date = new Date();
    var year = String(date.getFullYear());
    var month = String(date.getMonth() + 1);
    var day = String(date.getDate());

    var hours = String(date.getHours());

    if (("" + month).length == 1){
        month = "0" + month;
    }
    if (("" + day).length == 1){
        day = "0" + day;
    }
    if (("" + hours).length == 1){
        hours = "0" + hours;
    }

    var todatehours = year + month + day + hours;
    var intdate = parseInt(todatehours);
    var todate = year + "-" + month + "-" + day;

    function main_getCookie(name){
        var nameOfCookie = name + "=";
        var x = 0;
        while (x <= document.cookie.length) {
            var y = (x + nameOfCookie.length);
            if (document.cookie.substring(x, y) == nameOfCookie) {
                if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                    endOfCookie = document.cookie.length;
                return unescape(document.cookie.substring(y, endOfCookie));
            }
            x = document.cookie.indexOf(" ", x) + 1;
            if (x == 0)
                break;
        }
        return "";
    }

    function main_setCookie( name, value, expiredays ) {
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }

    function mainCloseWind(layer_name , form_name ) {
        if ( document.all[form_name].chkbox.checked ){
            main_setCookie( layer_name, "done" , 1 );
        }
        document.all[layer_name].style.visibility = "hidden";
    }
	/*
	*/
    $(function(){
        cookiedata = document.cookie;
        if (main_getCookie('covid_close')=='Y') {
        	//console.log('가림')
        	//document.all['covid_head'].style.display = "none";
        	$('.covid_head').css("display","none");
        }else{
        	//console.log('보임');
        	//document.all['covid_head'].style.display = "block";
        	$('.covid_head').css("display","block");
        }
    });
</script>
<c:choose>
	<c:when test="${mngTopVO.notiType eq 'covid19'}">
        <div style="display:none;" class="covid_head">
            <div class="wrap">
                <div class="title_area">
                    <h1><img src="/site/main/images/main/covid_head_title1.png" alt="성동구 코로나19">
                        <img src="/site/main/images/main/covid_head_title2.png" alt="종합 현황">
                        <span class="mobile_text">성동구 <span>코로나19</span> 종합 현황</span>
                    </h1>
                    <!--<p class="time">12월 30일(수) 16시 기준</p>--><br class="br_mobile" />
                    <a href="https://www.sd.go.kr/intro.jsp" class="more_btn"><span>바로가기</span></a>

                  <!--  <div class="btn_area">
                        <ul class="clearfix">
						    <li><a href="https://www.sd.go.kr/main/contents.do?key=4477"><span>확진시 성동구 진행절차 종합안내</span></a></li>
						    <li><a href="https://www.sd.go.kr/main/sub.do?key=4484"><span>원스톱 진료기관 및 호흡기 환자 진료센터 안내</span></a></li>
						    <li><a href="https://www.sd.go.kr/main/sub.do?key=4481"><span>재택치료자 격리통지서 조회 및 발급</span></a></li>
                            <li><a href="https://www.sd.go.kr/main/sub.do?key=4446"><span>회복기원 꾸러미 등 확진자 지원사항</span></a></li>
                        </ul>
                    </div>-->
                </div>
                <div class="close_area">
                    <div class="issue_today">
                        <div class="check_today"><input type="checkbox" value="checkbox" name="today_close" id="input_today_covid"><label for="input_today_covid">하루동안 보지않기</label></div>
                        <button type="button" class="issue_btn">팝업 닫기</button>
                    </div>
                </div>
            </div>
        </div>
	</c:when>		
	<c:otherwise>
        <div class="calamity_head ${mngTopVO.notiType}">
            <!--
                재난종류에 따른 상단 이미지 클래스명으로 구분
                호우 - downpour
                폭염 - heat_wave
                지진 - earthquake
                대설 - heavy_snow
                한파 - cold_wave
                풍수해 - flood_damage
                가뭄 - drought
                산사태 - landslide
                황사 - dust_storm
            -->
            <div class="wrap">
                <div class="title_area">
                    <!--<div class="calamity_situation"><span>성동구 호우 특보 발효</span></div>-->
                    <c:choose>
                    	<c:when test="${!empty(mngTopVO.notiText)}">
	                    <h1>성동구 재난상황 종합안내</h1>
	                    <h2>${mngTopVO.notiText}</h2>
                    	</c:when>
                    	<c:otherwise>
						<h1></h1>
                    	<h2>성동구 재난상황 종합안내</h2>
                    	</c:otherwise>                    
                    </c:choose>                
                    <a href="/main/disasterSafety.do" class="more_btn"><span>자세히보기</span></a>
                    <a href="https://www.sd.go.kr/intro.jsp" class="covid_btn"><span>성동구 코로나19 바로가기</span></a>
                </div>
            </div>
			<!-- 여기까지 재난표시 -->
        </div>	
	</c:otherwise>
</c:choose>