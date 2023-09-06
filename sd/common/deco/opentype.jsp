<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:if test="${not empty menuInfo and not empty menuInfo.cclCn}">
	<c:choose>
		<c:when test="${menuInfo.cclCn eq '1'}">
			<c:set var="cclLmt">출처표시</c:set>
		</c:when>
		<c:when test="${menuInfo.cclCn eq '2'}">
			<c:set var="cclLmt">출처표시 + 상업용금지</c:set>
		</c:when>
		<c:when test="${menuInfo.cclCn eq '3'}">
			<c:set var="cclLmt">출처표시 + 변경금지</c:set>
		</c:when>
		<c:when test="${menuInfo.cclCn eq '4'}">
			<c:set var="cclLmt">출처표시 + 상업용금지 + 변경금지</c:set>
		</c:when>
	</c:choose>

	<c:if test="${not empty cclLmt}">

	<h3 class="skip">공공누리 공공저작물</h3>
	<div class="kogl_open">
		<img src="/common/images/program/kogl_open_${menuInfo.cclCn}.png" alt="공공누리 공공저작물 자유이용허락 : <c:out value="${cclLmt}"/>"/>
		본 저작물은 <em class="em_red">"공공누리 제${menuInfo.cclCn}유형 : ${cclLmt}"</em> 조건에 따라 이용할 수 있습니다.
	</div>
	</c:if>
</c:if>