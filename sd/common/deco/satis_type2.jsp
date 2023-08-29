<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
						<h3 class="skip">담당자 정보</h3>
						<div class="manager_info clearfix">
							<ul class="clearfix">
								<c:if test="${not empty menuInfo.deptNm}">
								<li>
									<span>담당부서</span> <c:out value="${menuInfo.deptNm}" />
								</li>
								<li>
									<c:if test="${not empty menuInfo.emplNm}">&nbsp;<span>담당자</span> <c:out value="${menuInfo.emplNm}" /></c:if>
								</li>
								</c:if>
								<c:if test="${not empty menuInfo.emplTelno}">
								<li><span>전화번호</span> <c:out value="${menuInfo.emplTelno}" /></li>
								</c:if>

								<c:if test="${not empty menuInfo.cntntsLastUpdusrPnttmYMD}">
								<li><span>최종수정일</span> <c:out value="${menuInfo.cntntsLastUpdusrPnttmYMD}" /></li>
								</c:if>
							</ul>
						</div>
