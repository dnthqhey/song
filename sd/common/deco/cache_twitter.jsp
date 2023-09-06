<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%-- 트위터 --%><%@ include file="/common/deco/tw_access_token.jsp"%>
<%
	request.setAttribute("show_cache_twitter_contents", false);
	try {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		CacheService cacheService = (CacheService)wac.getBean("remoteCacheService");
		RemoteReadService twitterFetchService = (RemoteReadService)wac.getBean("twitterFetchService");
		List<RssItem> twitterList = (List<RssItem>)cacheService.query(twitterFetchService, "?consumerKey="+TW_consumerKey+"&consumerSecret="+TW_consumerSecret+"&accessToken="+TW_accessToken+"&accessTokenSecret="+TW_accessTokenSecret);
		request.setAttribute("twitterList",twitterList);
	}
	catch(Exception e) {
		e.printStackTrace();
	}
%><c:if test="${show_cache_twitter_contents}"><c:set var="rssList" value="${twitterList}"/><c:if test="${not empty rssList and fn:length(rssList) gt 0}">
<h3>TW</h3>
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