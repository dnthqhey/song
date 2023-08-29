<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="kr.co.hanshinit.NeoCMS.site.service.SiteService" %>
<%@	page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfo" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
SiteInfo siteInfo = null;
try {
	String siteId = request.getParameter("siteId");
	if(siteId != null) {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		SiteService siteService = (SiteService)wac.getBean("siteService");
		siteInfo = siteService.getSiteInfo(request, siteId);
	}

	if(siteInfo == null) {
		response.sendRedirect("/common/block.do");
		return;
	}
}
catch(IllegalStateException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
catch(org.springframework.beans.BeansException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
catch(NullPointerException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
request.setAttribute("siteInfo", siteInfo);
%>
<!DOCTYPE html>
<html lang="<c:choose><c:when test="${siteInfo.siteId == 'chi'}">zh</c:when><c:when test="${siteInfo.siteId == 'eng'}">en</c:when><c:otherwise>ko</c:otherwise></c:choose>">
<head>
    <meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=yes" />
	<meta name="author" content="${siteInfo.siteAuthr}" />
	<meta name="keywords" content="${siteInfo.siteKwrd}" />
	<meta name="description" content="${siteInfo.siteDc}" />
	<link rel="stylesheet" href="/common/css/font.css" />
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
	<!--[if lt IE 10]><script src="/common/js/consolefix.js"></script><![endif]-->
    <!--[if lt IE 9]><script src="/common/js/html5.js"></script><![endif]-->
	<!--[if lt IE 7]><script src="/common/js/unitpngfix.js"></script><![endif]-->
	<script src="/common/js/jquery-1.12.4.min.js"></script>
	<script src="https://spi.maps.daum.net/imap/map_js_init/roughmapLoader.js"></script>
	<script src="/common/js/jquery.easing.1.3.js"></script>
	<script src="/common/js/slick.min.js"></script>
	<script src="/common/js/layout.js"></script>
	<script src="/common/js/sub.js"></script>
	<script src="/common/js/print.js"></script>
	<script src="/site/${siteInfo.siteId}/js/sub.js"></script>
	<script>
		$.tag.dcmt.on('ready.print', function(event) {
			$.ajax({
				type: 'GET',
				url: '/site/${siteInfo.siteId}/css/sub.css',
				success : function(data) {
					data = data.replace("@import url('/site/${siteInfo.siteId}/css/common.css');", "");
					data = data.replace("@import url('/site/${siteInfo.siteId}/css/sub_layout.css');", "");
					data += "@import url('/common/css/print.css');";
					$.tag.head.append("<style>" + data + "</style>");
				}
			});
		});
	</script>
	<title>${siteInfo.siteNm} <c:choose><c:when test="${siteInfo.siteId == 'chi'}">打印</c:when><c:when test="${siteInfo.siteId == 'eng'}">Print</c:when><c:otherwise>프린트</c:otherwise></c:choose></title>
</head>
<body>
	<div id="wrapper">
		<header id="header" class="clearfix">
			<div class="logo">
				<h1 class="wrap">${siteInfo.siteNm} <c:choose><c:when test="${siteInfo.siteId == 'chi'}">打印网页</c:when><c:when test="${siteInfo.siteId == 'eng'}">Print Page</c:when><c:otherwise>웹페이지 인쇄하기</c:otherwise></c:choose></h1>
			</div>
			<div class="gnb">
				<ul class="clearfix">
					<li><button class="print"><c:choose><c:when test="${siteInfo.siteId == 'chi'}">打印</c:when><c:when test="${siteInfo.siteId == 'eng'}">Print</c:when><c:otherwise>프린트</c:otherwise></c:choose></button></li>
					<li><button class="close"><c:choose><c:when test="${siteInfo.siteId == 'chi'}">关闭</c:when><c:when test="${siteInfo.siteId == 'eng'}">Close</c:when><c:otherwise>닫기</c:otherwise></c:choose></button></li>
				</ul>
			</div>
		</header>
		<main id="container" tabindex="0">
			<div class="wrap clearfix">
				<div class="colgroup">
					<article>
						<header class="sub_head">
							<div class="path"></div>
							<div class="sub_title">
								<h2>&nbsp;</h2>
							</div>
						</header>
						<div id="contents"></div>
						<div class="dimmed">&nbsp;</div>
					</article>
				</div>
			</div>
		</main>
		<footer id="footer">
			<div class="wrap">
				<p class="warning em_red"><c:choose><c:when test="${siteInfo.siteId == 'chi'}">背景图像不包括在打印的页。请更改您的浏览器选项。</c:when><c:when test="${siteInfo.siteId == 'eng'}">The background image is not included in the print page. Please change your browser options.</c:when><c:otherwise>배경이미지는 프린트페이지에 포함되지 않습니다. 브라우저 옵션을 변경해 주세요.</c:otherwise></c:choose></p>
			</div>
			<jsp:include page="/common/deco/w3c.jsp" />
		</footer>
	</div>
</body>
</html>
