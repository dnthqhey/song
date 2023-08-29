<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div class="clearfix">
	<div class="col-12 col-sm-24 margin_t_10 small">
		총 <em class="em_black" data-mask="#,##0" data-mask-reverse="true">${paginationInfo.totalRecordCount}</em>건
		<c:if test="${paginationInfo.totalPageCount gt 1}">
		[ <em class="em_b_black">${paginationInfo.currentPageNo}</em> / ${paginationInfo.totalPageCount} 페이지 ]
		</c:if>
	</div>
	<div class="col-12 col-sm-24 right padding_0 margin_b_10">
		<c:if test="${paginationInfo.totalPageCount gt 1}">
		<c:if test="${not empty scrit}">
		<form:form id="paging_scrit" commandName="scrit" name="searchForm" action="?${scrit.qsk}" method="post">
			<form:select path="cpn" class="p-input p-input--auto" title="페이지선택">
				<c:forEach var="p" begin="1" end="${paginationInfo.totalPageCount}">
				<c:if test="${scrit.cpn ne p}">
				<form:option value="${p}">${p}</form:option>
				</c:if>
				</c:forEach>
			</form:select>
			<input value="이동" type="submit" class="p-button p-button--small primary"/>
		</form:form>
		</c:if>
		</c:if>
	</div>
</div>

