<%@ page contentType="text/html; charset=utf-8" %>
<%@ page isErrorPage="true" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<% pageContext.setAttribute("newLineChar", "\n"); %>
<% pageContext.setAttribute("lineFeedChar", "\r"); %>
<% pageContext.setAttribute("jNewLineChar", "\\n"); %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" /><meta name="decorator" content="null"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="stylesheet" type="text/css" href="/common/css/program.css" />
	<script src="/common/js/jquery-1.12.4.min.js"></script>
	<script src="/common/js/program.min.js"></script>
	<title>안내페이지(500)</title>
</head>
<body>

<div class="row">
    <div class="col-12 col-offset-6 col-sm-24 col-sm-offset">
        <div class="card card--corner">
            <div class="card__body text_center">
                <div class="card__title">안내</div>
                <div class="card__content">잘못된 경로로 접근 하셨거나 일시적인 오류 입니다.</div>
            </div>
        </div>
    </div>
</div>

<div class="p-button-group row">
    <div class="col-4 col-offset-10 col-sm-24 col-sm-offset text_center">
        <a href="/" class="p-button p-button--large primary skip">홈으로 이동</a>
		<a href="#n" onclick="history.back();" class="p-button p-button--large info">이전 페이지</a>
    </div>
</div>

<c:set var="remoteIp"><%=kr.co.hanshinit.NeoCMS.cmm.util.HtmlUtil.getRemoteAddr(request)%></c:set>
<c:set var="msg" value=""/>
<c:set var="DEBUG">Y</c:set>

<c:choose>
<c:when test="${DEBUG eq 'Y' and not empty remoteIp and (remoteIp eq '127.0.0.1' or remoteip eq '175.212.21.90')}">
	<c:choose>
		<c:when test="${not empty exception}">
			<c:set var="msg"><%=kr.co.hanshinit.NeoCMS.cmm.util.HtmlUtil.getStackTrace(exception)%></c:set>
			<c:set var="emsg">${fn:replace(fn:replace(msg, newLineChar, jNewLineChar), lineFeedChar, jNewLineChar)}</c:set>

			<script>
			//<![CDATA[
			$(document).ready(function() {
				msg = '<c:out value="${emsg}"/>';
				if(confirm(msg + "\n\n이전페이지로 이동하시겠습니까?")) {
					window.history.back();
				}
			});
			//]]>
			</script>
		</c:when>
		<c:otherwise>


			<ul>
				<li>status_code : <c:out value="${requestScope['javax.servlet.error.status_code']}"/></li>
				<li>exception_type : <c:out value="${requestScope['javax.servlet.error.exception_type']}"/></li>
				<li>message : <c:out value="${requestScope['javax.servlet.error.message']}"/></li>
				<li>request_uri : <c:out value="${requestScope['javax.servlet.error.request_uri']}"/></li>
				<li>exception : <c:out value="${requestScope['javax.servlet.error.exception']}"/></li>
				<li>servlet_name : <c:out value="${requestScope['javax.servlet.error.servlet_name']}"/></li>
			</ul>


		</c:otherwise>
	</c:choose>
</c:when>
<c:otherwise>
	<c:if test="${not empty exception}">
		<c:set var="msg"><%=kr.co.hanshinit.NeoCMS.cmm.util.HtmlUtil.getStackTrace(exception)%></c:set>
		<c:set var="emsg">${fn:replace(fn:replace(msg, newLineChar, jNewLineChar), lineFeedChar, jNewLineChar)}</c:set>
	</c:if>

	<c:choose>
	<c:when test="${not empty msg}">
		<c:if test="${fn:indexOf(msg, 'error occurred') ne -1}">
			<c:set var="emsg">예외상황(파라미터오류 등)이 발생하였습니다.(1)</c:set>
		</c:if>
	</c:when>
	<c:otherwise>
		<c:set var="emsg">예외상황(파라미터오류 등)이 발생하였습니다.(2)</c:set>
	</c:otherwise>
	</c:choose>

	<script>
	//<![CDATA[
	$(document).ready(function() {
		msg = '<c:out value="${emsg}"/>';
		if(msg != '') {
			alert(msg);
		}
		window.history.back();
	});
	//]]>
	</script>
</c:otherwise>
</c:choose>








</body>
</html>