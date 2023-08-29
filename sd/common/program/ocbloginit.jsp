<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="java.io.File" %>
<%@ page import="java.util.*" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*" %>
<%
try {
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	CacheService cacheService = (CacheService)wac.getBean("remoteCacheService");
	RemoteReadService naverBlogFetchService = (RemoteReadService)wac.getBean("naverBlogFetchService");

	List<RssItem> blogList = null;
	String url = "http://blog.rss.naver.com/yourokcheon.xml";
	String cacheFileNm = cacheService.getCacheFileName(url);
	File cacheFile = new File(REMOTE_CACHE_CANONICAL_PATH, cacheFileNm);
	FileUtil.deleteFile(cacheFile);
	blogList = (List<RssItem>)cacheService.query(naverBlogFetchService, url);
	request.setAttribute("blogList",blogList);
catch(IllegalStateException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
catch(Exception e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, user-scalable=yes" />
	<meta name="keywords" content="옥천군청" />
	<meta name="description" content="옥천군청에 오신것을 환영합니다." />
    <title>옥천군청</title>
</head>
<body id="main" class="www">
<div class="sns_list">
	<c:if test="${not empty blogList and fn:length(blogList) gt 0}">
	<c:forEach var="it" items="${blogList}" end="4">
	<div class="sns_slide">
		<a href="<c:out value="${it.link}"/>" title="새창" target="_blank">
			<div class="sns_image">
				<c:choose>
				<c:when test="${not empty it.enclosureUrl}">
				<img src="<c:out value="${it.enclosureUrl}"/>" alt="<c:out value="${tsu:removeTag(it.title)}"/> 이미지" />
				</c:when>
				<c:otherwise>
				<img src="/site/www/images/main/sns_slide1.gif" alt="<c:out value="${tsu:removeTag(it.title)}"/> 이미지" />
				</c:otherwise>
				</c:choose>
			</div>
			<div class="sns_text">
				<c:set var="sjcn"><c:if test="${empty it.description}"><c:out value="${tsu:removeTag(it.title)}"/></c:if><c:out value="${tsu:removeTag(it.description)}"/></c:set>
				<p><c:out value="${sjcn}"/></p>
			</div>
		</a>
	</div>
	</c:forEach>
	</c:if>
</div>
<script src="/common/js/jquery-1.12.4.min.js"></script>
</body>
</html>