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
	String FB_ID = "1639366623004747";
	String FB_ACCESS_TOKEN = "EAAKG35lpjfQBAMs3NtZAWBjFrGRvlvbZAqI0ytFnPTBMQop0ZBeQiR6XnZBS1kLspV8yC8fZBsbRhJRIYGGUrRgT2RmVj4SSP16pOlK2jt9tKh1zfZAbZCal4GsrqNBppLCoCpsKZCBzcVgyQd7u5CxJm19BZB1iSF1jXSTLRLxQVKwZDZD";

	request.setAttribute("show_cache_facebook_contents", false);
	try {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		CacheService cacheService = (CacheService)wac.getBean("remoteCacheService");
		RemoteReadService facebookFetchService = (RemoteReadService)wac.getBean("facebookFetchService");
		List<RssItem> facebookList = (List<RssItem>)cacheService.query(facebookFetchService, "?facebookId="+FB_ID+"&access_token="+FB_ACCESS_TOKEN+"&fetchSize=5&version=v8.0");
		request.setAttribute("facebookList",facebookList);
	}
	catch(Exception e) {
		e.printStackTrace();
	}
%><c:if test="${show_cache_facebook_contents }"><c:set var="rssList" value="${facebookList}"/><c:if test="${not empty rssList and fn:length(rssList) gt 0}">
<h3>FB</h3>
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