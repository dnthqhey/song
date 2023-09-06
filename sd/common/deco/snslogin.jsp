<%@ page language="java" pageEncoding="UTF-8"%>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@	page import="org.springframework.social.oauth2.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.PropResource" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.StringUtil" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.snsLogin.naver.NaverLoginDTO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.snsLogin.kakao.KakaoApi" %>
<%
WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());

/*Naver Login*/
String naverAuthUrl = NaverLoginDTO.getAuthorizationUrl(session);	//Call URL
request.setAttribute("naverAuthUrl", naverAuthUrl);

/*Kakao Login*/
String kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize"; //Call URL
kakaoAuthUrl = kakaoAuthUrl+"?client_id="+KakaoApi.getKakaoApiKey()+"&redirect_uri="+KakaoApi.getKakaoRedirectUri()+"&response_type=code";
request.setAttribute("kakaoAuthUrl", kakaoAuthUrl);
%>
<div class="social_login">
    <a href="${naverAuthUrl}" class="login_link naver" target="NID" title="새창">
        <div class="social_icon">네이버 아이콘</div>
        <div class="text">네이버 아이디로 로그인</div>
    </a>
    <a href="${kakaoAuthUrl}" class="login_link kakao">
        <div class="social_icon">카카오톡 아이콘</div>
        <div class="text">카카오톡 아이디로 로그인</div>
    </a>
    <!-- <a href="" class="login_link facebook">
        <div class="social_icon">페이스북 아이콘</div>
        <div class="text">페이스북 아이디로 로그인</div>
    </a> -->
</div>