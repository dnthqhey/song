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
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.bim.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.impl.*" %>
<%
try {
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());

	Integer[] bbsNoArr = new Integer[] { 464 } ;
	Integer[] nttNoArr = new Integer[] { 322082 } ;
	BbsNttVO bbsNttVO = new BbsNttVO();
	bbsNttVO.setBbsNoArr(bbsNoArr);
	bbsNttVO.setSearchNttNoArr(nttNoArr);
	bbsNttVO.setFirstIndex(0);
	bbsNttVO.setLastIndex(nttNoArr.length);
	bbsNttVO.setIntegrDeptCode(null);
	bbsNttVO.setIndvdlzShowAt(null);
	BbsNttDAO bbsNttService = (BbsNttDAO)wac.getBean("bbsNttDAO");
	// 보도자료		bbsNo=45&key=2868
	List<BbsNttVO> bbsNttList01 = bbsNttService.selectBbsMiniList(bbsNttVO);
	request.setAttribute("bbsNttList01", bbsNttList01);
}
catch(Exception e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
%>
<c:forEach var="n" items="${bbsNttList01}">
<div class="corona_info gs_corona">
	<div class="title"><a href="/health/selectBbsNttView.do?bbsNo=${n.bbsNo}&amp;nttNo=${n.nttNo}&amp;key=5114" title="새창" target="_blank"><c:out value="${n.nttSj}"/></a></div>
	<p>
		<c:out value="${tsu:nl2br(n.aditfield2)}" escapeXml="false"/>
	</p>
</div>
</c:forEach>