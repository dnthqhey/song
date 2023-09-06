<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.Collections" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.eminwon.service.*" %>
<%
try {
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	CacheService cacheService = (CacheService)wac.getBean("nextHourRemoteCacheService");


	try {
		RemoteReadService facebookFetchService = (RemoteReadService)wac.getBean("facebookFetchService");
		List<RssItem> facebookList = (List<RssItem>)cacheService.query(facebookFetchService, "?facebookId=178009262212391&access_token=EAAhA3SOBmnwBAP8llJtEkGsF6SZBGJkTDM2eplDsBxLX52BUrYow4EfS5YEZBZCaweIjabysZBrulatC6BnKlBZCfx7WDx3GX8E8efNOZCpwdWO3ARZAClJqv5Av2AyDJsVpkjT55TTT5ZBpudlK9g6UZBZCRPwAbiMlTwADk8BPZBafgZDZD&fetchSize=10");
		request.setAttribute("facebookList",facebookList);
	} catch(Exception e) {
		e.printStackTrace();
	}

	// 고시공고
	try {
		RemoteReadService eminwonService = (RemoteReadService)wac.getBean("eminwonService");
		EminwonData eminwonData = (EminwonData)cacheService.query(eminwonService, "01,02,04,05,06,07");
		request.setAttribute("eminwonData",eminwonData);
	} catch(Exception e) {
		e.printStackTrace();
	}


	try {
		String youtubeLink = "https://www.youtube.com/channel/UC-4cn_Iv6NbpEF0Ntbq3cMw";
		String youtubeUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UC-4cn_Iv6NbpEF0Ntbq3cMw&fetchSize=10";
		RemoteReadService youtubeFetchService = (RemoteReadService)wac.getBean("youtubeFetchService");
		List<RssItem> youtubeList = (List<RssItem>)cacheService.query(youtubeFetchService, youtubeUrl);
		request.setAttribute("youtubeList",youtubeList);
	} catch(Exception e) {
		e.printStackTrace();
	}
}
catch(IllegalStateException e) {
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

<c:set var="menu_no" value="2852"/>
<c:if test="${not empty eminwonData and not empty eminwonData.eminwonList and fn:length(eminwonData.eminwonList) gt 0}">
<h3>고시공고</h3>
<ul>
<c:forEach var="n" items="${eminwonData.eminwonList}">
<li>
	<a href="/www/selectEminwonView.do?key=${menu_no}&amp;not_ancmt_se_code=01,02,04,05,06,07&amp;not_ancmt_mgt_no=${n.pno}&amp;ofr_pageSize=10">${eminwon.gosiNo} ${n.sj}</a>
	${eminwon.registDe}
</li>
</c:forEach>
</ul>
</c:if>

<c:if test="${not empty youtubeList and fn:length(youtubeList) gt 0}">
<h3>영구네</h3>
<ul>
<c:forEach var="n" items="${youtubeList}">
<li>
	<a href="${n.link}">${n.title}</a>
</li>
</c:forEach>
</ul>
</c:if>


</body>
</html>