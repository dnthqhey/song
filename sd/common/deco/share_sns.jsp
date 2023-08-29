<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="req_url"><%=request.getRequestURL()%>?<%=request.getQueryString()%></c:set>
<c:set var="req_url" value="${fn:replace(req_url, '(', '（')}"/>
<c:set var="req_url" value="${fn:replace(req_url, ')', '）')}"/>
<c:set var="req_url" value="${fn:replace(req_url,'%', '％')}"/>
<script>
 //<![CDATA[
	function goFacebook() {
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//www.facebook.com/sharer.php?u="+encodeURIComponent(arg)+"&t="+encodeURIComponent(txt), "", "width=486, height=286");
	}

	function goTweet() {
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//twitter.com/intent/tweet?url="+encodeURIComponent(arg)+"&text="+encodeURIComponent(txt), "tweetPop", "width=486, height=286,scrollbars=yes");
	}

	function goNaverBlog(){
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		//window.open("//share.naver.com/web/shareView.nhn?url="+encodeURIComponent(arg)+"&title="+encodeURIComponent(txt), "naverPop", "width=486, height=186,scrollbars=yes");
		window.open("//share.naver.com/web/shareView.nhn?url="+arg+"&title="+txt, "naverPop", "width=486, height=186,scrollbars=yes");
	}

	fucion goKakao() {
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//story.kakao.com/share?url="+encodeURIComponent(arg)+"&title="+encodeURIComponent(txt), "naverPop", "width=486, height=186,scrollbars=yes");
	}
	//]]>
</script>

<a href="#n" onclick="javascript:goFacebook();return false;" target="_blank" rel="noopener noreferrer" title="새창으로 페이스북 공유창이 열립니다" class="facebook">페이스북 공유하기</a>
<%-- <a href="#n" onclick="javascript:goTweet();return false;" target="_blank" rel="noopener noreferrer" title="새창으로 트위터 공유창이 열립니다" class="twitter">트위터 공유하기</a> --%>
<a href="#n" onclick="javascript:goNaverBlog();return false;" target="_blank" rel="noopener noreferrer" title="새창으로 블로그 공유창이 열립니다" class="blog">블로그 공유하기</a>