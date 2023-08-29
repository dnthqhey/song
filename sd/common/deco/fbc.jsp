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
<%@ page import="egovframework.com.cmm.LoginVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.bim.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.eminwon.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%@ include file="/common/deco/fb_access_token.jsp"%>
<%
try {
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	CacheService cacheService = (CacheService)wac.getBean("remoteCacheService");
	// 페이스북
	RemoteReadService facebookFetchService = (RemoteReadService)wac.getBean("facebookFetchService");
	List<RssItem> facebookList = null;
	try { facebookList = (List<RssItem>)cacheService.query(facebookFetchService, "?facebookId=178009262212391&access_token="+FB_ACCESS_TOKEN+"&fetchSize=5&version=v5.0");  request.setAttribute("facebookList",facebookList); } catch(Exception e) {e.printStackTrace(); }
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
    <title>SNS Cache</title>
</head>
<body>

<c:if test="${not empty facebookList and fn:length(facebookList) gt 0}">
<h3>페이스북</h3>
<ul>
<c:forEach var="it" items="${facebookList}" end="4">
<li>
	<a href="<c:out value="${it.link}"/>" title="새창" target="_blank">
		<c:set var="sjcn"><c:if test="${empty it.description}"><c:out value="${tsu:removeTag(it.title)}"/></c:if><c:out value="${tsu:removeTag(it.description)}"/></c:set>
		<c:out value="${sjcn}"/>
	</a>
</li>
</c:forEach>
</ul>
</c:if>



</body>
</html>