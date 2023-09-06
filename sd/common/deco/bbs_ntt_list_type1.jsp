<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.List" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="egovframework.com.cmm.LoginVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.HtmlUtil"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.SessionUtil"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.DateUtil" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.bim.service.BbsInfo" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.BbsNttService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.BbsNttVO" %>
<%
WebApplicationContext wac = null;
String bbsMenuNo = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("bbsMenuNo"));
String bbsNo = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("bbsNo"));
String nttSize = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("nttSize"));

try {
	wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	BbsNttService bbsNttService = (BbsNttService)wac.getBean("bbsNttService");

	List<BbsNttVO> bbsNttList = bbsNttService.selectBbsMiniList(Integer.valueOf(bbsNo),Integer.valueOf(nttSize),null,null);	// 새소식
	request.setAttribute("bbsNttList", bbsNttList);
	request.setAttribute("bbsMenuNo", bbsMenuNo);
}
catch(IllegalStateException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
catch(Exception e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
%>
	<c:if test="${not empty bbsNttList and fn:length(bbsNttList) gt 0}">
	<ul>
		<c:forEach var="r" items="${bbsNttList}" varStatus="rstt">
		<li>
			<time datetime="<c:out value="${tsu:dateFormat(r.frstRegisterPnttm, 'yyyyMMddHHmmss', 'yyyy-MM-dd')}"/>"><c:out value="${tsu:dateFormat(r.frstRegisterPnttm, 'yyyyMMddHHmmss', 'yyyy-MM-dd')}"/></time>
			<a href="/${siteId}/selectBbsNttView.do?bbsNo=${r.bbsNo}&amp;nttNo=${r.nttNo}&amp;key=<c:out value="${bbsMenuNo}"/>"><c:out value="${r.nttSj}"/></a>
		</li>
		</c:forEach>
	</ul>
	<c:if test="${param.useMoreAt eq 'Y'}">
	<a href="/<c:out value="${siteId}"/>/sub.do?key=<c:out value="${bbsMenuNo}"/>" class="more">더보기</a>
	</c:if>
	</c:if>