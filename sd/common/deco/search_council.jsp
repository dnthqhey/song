<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import="java.util.*" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.council.service.*" %>
<%
try {
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	CouncilService councilService = (CouncilService)wac.getBean("councilService");
	SearchCriteria sc = new SearchCriteria();
	List<Map<String,Object>> ths =  councilService.thList(sc);
	int maxTh = 0;
	for(Map<String,Object> m : ths) {
		int th = (Integer)m.get("th");
		if(maxTh < th) {
			maxTh = th;
		}
	}
	request.setAttribute("maxTh", maxTh);

	sc.setSc1(String.valueOf(maxTh));
	List<Map<String,Object>> sessions = councilService.sessionList(sc);
	int maxSession = 0;
	for(Map<String,Object> m : sessions) {
		int s = (Integer)m.get("session");
		if(maxSession < s) {
			maxSession = s;
		}
	}
	request.setAttribute("maxSession", maxSession);
}
catch(Exception e) {

}
%>
<script>
function searchCouncil() {
	var kwrd = $('#search_query').val();
	if(kwrd == "") {
		alert("검색어를 입력해주십시오");
		$('#search_query').focus();
		return false;
	}

	var collection = $('#search_select').val();
	if(collection == '1') {
		$('#search_form').attr('action', '/council/selectBbsNttList.do?bbsNo=156&key=1804');
		$('#search_1_kwrd').val(kwrd);
	}
	else {
		$('#search_form').attr('action', '/council/assembly/details.do?key=1832');
		$('#search_2_kwrd').val(kwrd);
	}
}
</script>
<form id="search_form" action="/search/search.jsp" method="post" onsubmit="return searchCouncil();">
	<input type="hidden" id="search_1_condition" name="searchCnd" value="SJ"/>
	<input type="hidden" id="search_1_kwrd" name="searchKrwd"/>
	<input type="hidden" name="sc1" value="<c:out value="${maxTh}"/>"/>
	<input type="hidden" name="sc2" value="<c:out value="${maxSession}"/>"/>
	<input type="hidden" id="search_2_kwrd" name="sc6"/>

	<fieldset>
		<legend>검색 폼</legend>
		<span class="search_select" data-custom="select">
			<label for="search_select" data-custom-text>검색 분류 선택</label>
			<select id="search_select" title="검색 분류 선택">
				<option value="1" <c:if test="${cate eq '1'}">selected="selected"</c:if>>의원</option>
				<option value="2" <c:if test="${cate eq '2'}">selected="selected"</c:if>>회의록</option>
			</select>
		</span>
		<input type="search" class="search_keyword" placeholder="검색어를 입력하세요" title="검색어" id="search_query"/>
		<span class="search_submit"><input type="submit" value="검색" /></span>
	</fieldset>
</form>