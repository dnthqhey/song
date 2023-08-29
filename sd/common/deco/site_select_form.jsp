<%@ page pageEncoding="utf-8"%>
<%@	page import="java.util.*"%>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.cma.cdc.service.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %><%
try {
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	CmmnDetailCodeService cmmnDetailCodeService = (CmmnDetailCodeService)wac.getBean("cmmnDetailCodeService");

	// 공통코드 : 사이트 구분 SITE01
	List<CmmnDetailCode> siteSeList = cmmnDetailCodeService.selectCmmnDetailCodeLIstByCodeId("SITE01");
	request.setAttribute("siteSeList", siteSeList);
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
%>
<%-- <c:out value="${param.siteListAttrName}"/> --%>
<c:set var="siteList" value="${sessionScope[param.siteListAttrName]}"/>
<c:if test="${empty siteList}"><c:set var="siteList" value="${requestScope[param.siteListAttrName]}"/></c:if>
<c:set var="p_siteId">${param.siteId}</c:set>
<c:set var="fn_change">${param.fn_change}</c:set>
<c:if test="${empty fn_change}"><c:set var="fn_change">fn_changeSite</c:set></c:if>
<c:if test="${not empty siteList and fn:length(siteList) gt 0  }">
<select name="siteId" onchange="<c:out value="${fn_change}"/>(this.value)" class="p-input p-input--auto">
<c:choose>
	<c:when test="${not empty siteSeList and not empty siteList and fn:length(siteSeList) gt 0 and fn:length(siteList) gt 0  }">
	<c:forEach var="c" items="${siteSeList}">
		<optgroup label="${c.codeNm}">
		<c:forEach var="s" items="${siteList}">
		<c:if test="${c.code eq s.siteSe}">
			<c:set var="selectedAttr"></c:set>
			<c:if test="${p_siteId eq s.siteId}"><c:set var="selectedAttr"> selected="selected"</c:set></c:if>
			<option value="${s.siteId}" ${selectedAttr}>${s.siteNm}</option>
		</c:if>
		</c:forEach>
		</optgroup>
	</c:forEach>
	</c:when>
	<c:otherwise>
		<c:forEach var="s" items="${siteList}">
		<option value="${s.siteId}" <c:if test="${p_siteId eq s.siteId}">selected="selected"</c:if>>${s.siteNm}</option>
		</c:forEach>
	</c:otherwise>
</c:choose>
</select>
</c:if>