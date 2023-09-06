<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:if test="${IP_CHECKER_LOADED ne 'Y'}">
<%@include file="/common/deco/ip_checker.jsp" %>
</c:if>

<c:choose>
<c:when test="${REMOTE_ADDR_IS_IN_SCHOOL eq 'Y' and (bbsMgrAuth eq 'Y' or loginVO.userSe eq 'EMPL' or loginVO.userSe eq 'EMPL_IT'  or loginVO.userSe eq 'STUD'  or loginVO.userSe eq 'GRAD'  or loginVO.userSe eq 'STAF')}">
<td>
<c:if test="${not empty ra_ntt.aditfield4}"><a href="<c:out value="${ra_ntt.aditfield4}"/>" target="_blank" title="새창" class="btn small" onclick="return confirm('학내에서만 다운로드가능합니다. 계속하시겠습니까?')">다운로드</a></c:if>
</td>
<td>
<c:if test="${not empty ra_ntt.aditfield5}"><a href="<c:out value="${ra_ntt.aditfield5}"/>" target="_blank" title="새창" class="btn small" onclick="return confirm('학내에서만 다운로드가능합니다. 계속하시겠습니까?')">다운로드</a></c:if>
</td>
</c:when>
<c:otherwise>
<td>
-
</td>
<td>
-
</td>
</c:otherwise>
</c:choose>

<c:if test="${bbsMgrAuth eq 'Y' }">
<td>${ra_ntt.ctgryNm}</td>
<td><a href="updateBbsNttView.do?bbsNo=${ra_ntt.bbsNo}&amp;nttNo=${ra_ntt.nttNo}<c:out value="${bbsNttVO.qs}"/>" class="btn small" style="width:70px;">수정</a></td>
<td><a href="deleteBbsNtt.do?bbsNo=${ra_ntt.bbsNo}&amp;nttNo=${ra_ntt.nttNo}<c:out value="${bbsNttVO.qs}"/>" class="btn small"  style="width:70px;" onclick="return confirm('삭제하시겠습니까?')">삭제</a></td>
</c:if>