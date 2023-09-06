<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:if test="${bbsMgrAuth eq 'Y' }">
<td>
	<c:set var="sttusArr" value="${fn:split('대기,처리완료', ',')}"/>
	<c:forEach var="s" items="${sttusArr}">
		<c:if test="${s ne ra_ntt.aditfield1}">
		<a href="updateBbsNttField.do?bbsNo=${ra_ntt.bbsNo}&amp;nttNo=${ra_ntt.nttNo}&amp;fieldNm=aditfield1&amp;fieldVal=<c:out value="${s}"/><c:out value="${bbsNttVO.qs}"/>" class="btn small">${s}</a>
		</c:if>
	</c:forEach>

	<a class="btn small" href="updateBbsNttView.do?bbsNo=${ra_ntt.bbsNo}&amp;nttNo=${ra_ntt.nttNo}<c:out value="${bbsNttVO.qs}"/>">수정</a>
	<a class="btn small" href="deleteBbsNtt.do?bbsNo=${ra_ntt.bbsNo}&amp;nttNo=${ra_ntt.nttNo}<c:out value="${bbsNttVO.qs}"/>" onclick="return confirm('삭제하시겠습니까?')">삭제</a>
</td>
</c:if>