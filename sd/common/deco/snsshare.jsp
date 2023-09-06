<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="req_url"><%=request.getRequestURL()%>?<%=request.getQueryString()%></c:set>
<script>
 //<![CDATA[
	function goFacebook() {
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//www.facebook.com/sharer.php?u="+encodeURIComponent(arg)+"&t="+encodeURIComponent(txt), "", "width=486, height=286");
		return false;
	}

	function goTweet() {
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//twitter.com/intent/tweet?url="+encodeURIComponent(arg)+"&text="+encodeURIComponent(txt), "tweetPop", "width=486, height=286,scrollbars=yes");
		return false;
	}

	function goNaverBlog(){
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//share.naver.com/web/shareView.nhn?url="+encodeURIComponent(arg)+"&title="+encodeURIComponent(txt), "naverPop", "width=486, height=186,scrollbars=yes");
		//window.open("//share.naver.com/web/shareView.nhn?url="+arg+"&title="+txt, "naverPop", "width=486, height=186,scrollbars=yes");
		return false;
	}
//]]>
</script>
<div class="cont clearfix">
	<a href="#n" onclick="return goFacebook();" target="_blank" rel="noopener noreferrer" title="새창으로 페이스북 공유창이 열립니다" class="facebook ir">페이스북 공유하기</a>
	<a href="#n" onclick="return goNaverBlog();" target="_blank" rel="noopener noreferrer" title="새창으로 블로그 공유창이 열립니다" class="blog ir">블로그 공유하기</a>
	<a href="#n" onclick="return goTweet();" target="_blank" rel="noopener noreferrer" title="새창으로 블로그 공유창이 열립니다" class="twitter ir">트위터 공유하기</a>
</div>