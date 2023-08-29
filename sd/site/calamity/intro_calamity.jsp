<% request.setAttribute("sitemapKey", 3468); %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.*" %>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, user-scalable=yes"/>
    <meta name="keywords" content="@@{siteInfo.siteKwrd}"/>
    <meta name="description" content="@@{siteInfo.siteDc}"/>
    <link rel="stylesheet" type="text/css" href="/common/css/font.css"/>
    <link rel="stylesheet" type="text/css" href="/site/calamity/css/main.css"/>
    <script src="/common/js/html5.js"></script>
    <script src="/common/js/jquery-1.12.4.min.js"></script>
    <script src="/common/js/jquery.easing.1.3.min.js"></script>
    <script src="/common/js/program.min.js"></script>
    <script src="/site/calamity/js/main.js"></script>
  <%--
  <script type="text/javascript" src="<c:url value='/site/calamity/js/video.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/site/calamity/js/videojs-contrib-hls.min.js'/>"></script>
   --%>
        <script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
        <link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/7.10.2/video.min.js"></script>

        <link href="https://unpkg.com/@silvermine/videojs-quality-selector/dist/css/quality-selector.css" rel="stylesheet">
        <script src="https://unpkg.com/@silvermine/videojs-quality-selector/dist/js/silvermine-videojs-quality-selector.min.js"></script>  
    <title>성동구 재난상황</title>
    <script>
    
    </script>
</head>
<body>
<h1 class="skip">성동구 재난상황 안내</h1>
<header class="downpour">
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
    <div class="header_inner">
        <span class="logo"><a href="https://www.sd.go.kr/main/index.do"><img src="https://www.sd.go.kr/site/intro/images/main/intro_logo.png" alt="스마트포용도시 성동구"></a>재난상황 종합안내</span>
        <div class="occurrence_item sms">
            <a href="https://www.sd.go.kr/main/sub.do?key=1243&amp;" class="sd_sms sms_pc">
                <div class="sms_text">
                    성동구 문자알림<br /><em>서비스 신청</em>
                </div>
            </a>
        </div>
    </div>
</header>
<main>
    <div class="top_wrap">
        <h2>현재 성동구 전역에 <em class="point_color2">호우 특보 발효!</em></h2>
        <a href="#" class="news_more">[자세히보기]</a>
    </div>
    <div class="calamity_wrap">
        <div class="calamity_inner">
            <section class="sd_status">
                <div class="cont_area n1">
                    <h3 class="status_title">실시간 강우량 정보</h3>
                    <div class="status_cont">
                        <div class="map">
                            <div class="maker maker1">
                                <em>왕십리도선동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker2">
                                <em>왕십리제2동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker3">
                                <em>마장동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker4">
                                <em>사근동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker5">
                                <em>행당제1동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker6">
                                <em>행당제2동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker7">
                                <em>응봉동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker8">
                                <em>금호1가동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker9">
                                <em>금호2,3가동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker10">
                                <em>금호4가동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker11">
                                <em>옥수동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker12">
                                <em>성수1가제1동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker13">
                                <em>성수1가제2동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker14">
                                <em>성수2가제1동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker15">
                                <em>성수2가제3동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker16">
                                <em>송정동</em>
                                <b>0</b>
                            </div>
                            <div class="maker maker17">
                                <em>용답동</em>
                                <b>0</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cont_area n2">
                    <h3 class="status_title">기상 특보 발표 현황</h3>
                    <div class="status_cont">
                        
                    </div>
                   <!-- <h3 class="status_title">안전 안내문자</h3>
                    <div class="status_cont">
                        <strong class="msg_caller">[국민안전처]</strong>
                        <p class="msg_text"><a href="#" >03일 00시 호우경보, 산사태ㆍ상습침수 등 위험지역 대피, 외출자제 등 안전에 주의하세요</a></p>
                        <a href="#" class="msg_more">더보기 +</a>
                    </div>-->
                </div>
            </section>
            <section class="onsite_info">
                <div class="cont_area n1">
                    <h3>교통정보 TOPIS</h3>
                    <div class="onsite_title">
                        한강 주요지점 수위 및 통제예정 정보
                    </div>
                    <div class="onsite_cont">
                        <div class="topis_wrap">
                            <ul class="topis_list">
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_danger">전면통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="topis_item">
                                    <a href="#" class="item_link">
                                        <div class="icon_box">
                                            <img src="/site/calamity/images/main/topis_icon01.png" alt="공사">
                                        </div>
                                        <div class="text_box">
                                            <h3 class="item_heading">
                                                올림픽대로 김포방향(한남대교남단 → 반포대교남단) 6차로 시설물보수
                                                <span class="label label_warning">부분통제</span>
                                            </h3>
                                            <span class="item_date">
                                                발생일시 09.16 10:05<br>
                                                완료예정 09.16 18:00
                                            </span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="cont_area n2">
                    <h3>현장 CCTV 화면</h3>
                    <div class="onsite_title">
                        한강 주요지점 수위 및 통제예정 정보
                    </div>
                    <div class="onsite_cont">
                        <%--
                        <video width="500" id="hlsPlayEx" controls="" muted="" src="http://cctvsec.ktict.co.kr/5142/uLhIY4Qoz1BSnsJTRqMxANJNOA87dH9syhnbFbfV+PdFy1wTVSWS/Ong/4BxlR+DxXYGImpASZBSrOdwM0CC0QDUM1VmbJoKyyCwseVq8TA="></video>
                        --%>
                        <video id="video_1" class="video-js vjs-default-skin" controls preload="auto" width="500" height="268" data-setup='{}'>
                            <source src="blob:http://cctvsec.ktict.co.kr/5142/uLhIY4Qoz1BSnsJTRqMxANJNOA87dH9syhnbFbfV+PdFy1wTVSWS/Ong/4BxlR+DxXYGImpASZBSrOdwM0CC0QDUM1VmbJoKyyCwseVq8TA=" type="video/mp4" label="720P">
                            <source src="blob:http://cctvsec.ktict.co.kr/5142/uLhIY4Qoz1BSnsJTRqMxANJNOA87dH9syhnbFbfV+PdFy1wTVSWS/Ong/4BxlR+DxXYGImpASZBSrOdwM0CC0QDUM1VmbJoKyyCwseVq8TA=" type="video/mp4" label="480P" selected="true">
                            <source src="blob:http://cctvsec.ktict.co.kr/5142/uLhIY4Qoz1BSnsJTRqMxANJNOA87dH9syhnbFbfV+PdFy1wTVSWS/Ong/4BxlR+DxXYGImpASZBSrOdwM0CC0QDUM1VmbJoKyyCwseVq8TA=" type="video/mp4" label="360P">
                        </video>
                    </div>
                </div>
            </section>
            <section class="tab_calamity">
                <div class="calamity_tab">
                    <ul class="tab_list">
                        <li class="tab_item active" title="활성화"><button type="button"><h3>성동구 조치내역</h3></button></li>
                    </ul>
                </div>
                <div class="calamity_panel">
                    <div class="panel_content active" title="활성화">
                        <ul class="item_list">
                            <li class="item active" title="열림">
                                <button class="list_line">
                                    <span class="item_subject">제목입니다.</span>
                                    <span class="view_detail">클릭하여 상세보기</span>
                                </button>
                                <div class="list_content">
                                    <p>내용입니다. 내용입니다.</p>
                                </div>
                            </li>
                            <li class="item">
                                <button class="list_line">
                                    <span class="item_subject">제목입니다.</span>
                                    <span class="view_detail">클릭하여 상세보기</span>
                                </button>
                                <div class="list_content">
                                    <p>내용입니다. 내용입니다.</p>
                                </div>
                            </li>
                            <li class="item">
                                <button class="list_line">
                                    <span class="item_subject">제목입니다.</span>
                                    <span class="view_detail">클릭하여 상세보기</span>
                                </button>
                                <div class="list_content">
                                    <p>내용입니다. 내용입니다.</p>
                                </div>
                            </li>
                        </ul>
                        <a href="#" class="btn link view_more">바로가기</a>
                    </div>
                </div>
            </section>
            <section class="calamity_guide">
                <ul class="calamity_links">
                    <li>
                        <h3>재난시 행동요령</h3>
                        <a href="#" target="_blank" title="새창" rel="noopener noreferrer" class="n1"><span>재난시 행동요령 바로가기</span></a>
                    </li>
                    <li>
                        <h3>주요사이트 링크</h3>
                        <a href="#" target="_blank" title="새창" rel="noopener noreferrer" class="n2"><span>위험물 신고 : 스마트 불편신고</span></a>
                    </li>
                </ul>
                <div class="calamity_call">
                    <dl>
                        <dt>문의전화</dt>
                        <dd>02-000-0000 / 02-000-0000</dd>
                    </dl>
                </div>
            </section>
        </div>
    </div>
</main>
<footer>COPYRIGHT(C) SEONGDONG-GU. ALL RIGHTS RESERVED.</footer>
<script type="text/javascript">
     var player = videojs('video_1');
     player.play();
</script>
</body>
</html>