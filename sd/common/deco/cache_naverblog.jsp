<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%
	request.setAttribute("show_cache_naver_blog_contents", false);
	String BLOG_ID = "seongdonggu1";

	try {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		CacheService cacheService = (CacheService)wac.getBean("remoteCacheService");
		RemoteReadService naverBlogFetchService = (RemoteReadService)wac.getBean("naverBlogFetchService");
		List<RssItem> blogList = (List<RssItem>)cacheService.query(naverBlogFetchService, "http://blog.rss.naver.com/"+BLOG_ID+".xml");
		request.setAttribute("blogList",blogList);
	}
	catch(Exception e) {
		e.printStackTrace();
	}
%><c:if test="${show_cache_naver_blog_contents }"><c:set var="rssList" value="${blogList}"/><c:if test="${not empty rssList and fn:length(rssList) gt 0}">
<h3>NB</h3>
<ul>
<c:forEach var="it" items="${rssList}" end="4">
<li>
	<a href="<c:out value="${it.link}"/>" title="새창" target="_blank">
		<c:set var="sjcn"><c:if test="${empty it.description}"><c:out value="${tsu:removeTag(it.title)}"/></c:if><c:out value="${tsu:removeTag(it.description)}"/></c:set>
		<c:out value="${sjcn}"/>
	</a>
</li>
</c:forEach>
</ul>
</c:if></c:if>