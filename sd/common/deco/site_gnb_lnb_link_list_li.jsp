<%@ page language="java" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
						<c:choose>
							<c:when test="${empty IS_NOT_FOR_LOGIN and not empty loginVO and not empty loginVO.uniqId}">
<script type="text/javascript">
var idleTime = 0;
$(document).ready(function () { //Increment the idle time counter every minute.
	/**
	60,0000 밀리 세컨드 (60초) 마다 인터벌 체크 해서 지정한 횟수 30이 상 이면 자동 로그아웃 
	=> 30분 이상 키보드이력이나 마우스 움직임이 없으면 자동 로그아웃
	*/
	//var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
	
	$(this).mousemove(function (e) {
		idleTime = 0; });
	$(this).keypress(function (e) {
		idleTime = 0; });
});
function timerIncrement(){
	var timeLimit = 30;	
	idleTime = idleTime + 1;
	console.log(idleTime);
	if (idleTime > timeLimit ) { // 30 minutes
		alert(timeLimit+"분 이상 동작이 없기 때문에 로그아웃 처리 됩니다.");
		window.location = '/logout.do';		
	}
}
</script>							
							<li class="link_item n1 mypage"><a href="/main/selectMyInfo.do?key=4004&" class="link_anchor"><span>마이페이지</span></a><%-- ${loginVO.id} ${loginVO.name} ${loginVO.userSe} --%></li>
							<li class="link_item n1"><a href="/logout.do" class="link_anchor"><span>로그아웃</span></a><%-- ${loginVO.id} ${loginVO.name} ${loginVO.userSe} --%></li>
							</c:when>
							<c:otherwise>
								<c:choose>
								<c:when test="${empty menuInfo}">
								<c:set var="rurl">/${siteInfo.siteId}/index.do</c:set>
								</c:when>
								<c:otherwise>
								<c:set var="rurl">/${siteInfo.siteId}/sub.do?key=${key}</c:set>
								</c:otherwise>
								</c:choose>
                        <li class="link_item n1"><a href="/loginForm.do?url=${tsu:urlEncodeByEnc(rurl, 'utf-8')}" class="GNB_LOGIN_ANCHOR link_anchor"><span>로그인</span></a></li>
                        <li class="link_item n2"><a href="/main/joinStep1Form.do?key=${joinMenuKey}" class="link_anchor"><span>회원가입</span></a></li>
							</c:otherwise>
						</c:choose>