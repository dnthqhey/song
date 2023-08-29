<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:if test="${bbsMgrAuth eq 'Y' }">
<td>
	<c:set var="sttusArr" value="${fn:split('대기,승인,미승인', ',')}"/>
	<c:forEach var="s" items="${sttusArr}">
		<c:if test="${s ne ra_ntt.aditfield3}">
		<a href="updateBbsNttField.do?bbsNo=${ra_ntt.bbsNo}&amp;nttNo=${ra_ntt.nttNo}&amp;fieldNm=aditfield3&amp;fieldVal=<c:out value="${s}"/><c:out value="${bbsNttVO.qs}"/>" class="btn small">${s}</a>
		</c:if>
	</c:forEach>
</td>
</c:if>