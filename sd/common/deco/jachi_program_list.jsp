<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.List" %>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="egovframework.com.cmm.LoginVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.HtmlUtil"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.SessionUtil"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.DateUtil" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.education.service.*" %>
<%
WebApplicationContext wac = null;

String si1 = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("si1"));
String progMenuNo = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("progMenuNo"));
String progSiteId = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("progSiteId"));
String nttSize = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("nttSize"));

if(nttSize == null || "".equals(nttSize.trim())) {
	nttSize = "10";
}
if(progSiteId == null || "".equals(progSiteId.trim())) {
	progSiteId = "reserve";
}

request.setAttribute("progMenuNo", progMenuNo);
request.setAttribute("progSiteId", progSiteId);
request.setAttribute("si1", si1);

try {
	wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());

	TnEdcLctreService tnEdcLctreService = (TnEdcLctreService)wac.getBean("tnEdcLctreService");
	SearchCriteria esc = new SearchCriteria();
	esc.setRcpp(Integer.parseInt(nttSize));
	esc.setSi1(Integer.parseInt(si1));
	esc.setTc9("PERMIT");
	esc.setTc10("Y");
	List<TnEdcLctre> resultList = tnEdcLctreService.selectListWithPaging(esc);
	request.setAttribute("resultList" , resultList);
}
catch(IllegalStateException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
catch(Exception e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
%>
<c:if test="${not empty resultList and fn:length(resultList) gt 0}">
<ul class="hall_list clearfix">
	<c:forEach var="result" items="${resultList}" varStatus="rstt">
	<li class="hall_item">
	    <a href="/<c:out value="${progSiteId}"/>/viewTnEdcLctreU.do?lctreNo=${result.lctreNo}&amp;si1=${result.insttNo}&amp;key=<c:out value="${progMenuNo}"/>" class="hall_anchor">
	        <span class="info_left">
	            <span class="hall_subject"><c:out value="${result.crseNm}"/><c:if test="${not empty result.odr}">(<c:out value="${result.odr}"/>)</c:if></span> 
	            <span class="hall_term">
	                <span class="hall_info">
	                    <span class="info_title">신청기간</span>
	                    <span class="info_date"><c:out value="${tsu:dateFormat(result.rceptBgndt, 'yyyyMMddHHmm', 'MM.dd')}"/> ~ <c:out value="${tsu:dateFormat(result.rceptEnddt, 'yyyyMMddHHmm', 'MM.dd')}"/></span>
	                </span>
	                <span class="hall_info">
	                    <span class="info_title">교육기간</span>
	                    <span class="info_date"><c:out value="${tsu:dateFormat(result.edcBgnde, 'yyyyMMdd', 'MM.dd')}"/> ~ <c:out value="${tsu:dateFormat(result.edcEndde, 'yyyyMMdd', 'MM.dd')}"/></span>
	                </span>
	            </span>
	        </span>
	        <span class="hall_more">자세히<br/>보기</span>
	    </a>
	</li>
	</c:forEach>
</ul>
<a href="/<c:out value="${progSiteId}"/>/sub.do?key=<c:out value="${progMenuNo}"/>" target="_self" class="information_more">자치회관 프로그램 더보기</a>
</c:if>

<c:if test="${empty resultList or fn:length(resultList) lt 1}">
<div class="empty_box"><span class="no_cont">현재 운영중인 프로그램이 없습니다.</span></div>
</c:if>
